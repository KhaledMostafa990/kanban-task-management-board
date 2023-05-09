import React, { useState } from 'react';
import * as Yup from 'yup';

import { boardFormInfo } from '@/app/store/CONSTANT';
import { useAppDispatch } from '@/app/store/store';
import { Form, Formik, FormikHelpers } from 'formik';
import { createNewBoard } from '@/app/store';
import { Board } from '@/app/types';
import { Button, InputControl, InputField, ErrorMessageWrapper } from '@/components/base';

interface CreateNewBoardValue {
  name: string;
  [key: string]: string;
}

export function BoardForm({ defaultValues }: { defaultValues?: Board }) {
  const dispatch = useAppDispatch();
  const [formInputs, setFormInputs] = useState(boardFormInfo);

  const colsKeys = formInputs
    .filter((input) => input.inputs?.map((inp) => inp.name))[0]
    .inputs?.map((i) => i.name);

  const [initialValues] = useState<CreateNewBoardValue>(() => {
    if (!defaultValues) {
      return {
        name: '',
        ...colsKeys?.reduce((acc: any, curr) => {
          acc[curr] = '';
          return acc;
        }, {}),
      };
    }
    if (formInputs[1].inputs && defaultValues) {
      const newFormInputs = formInputs.map((input) => {
        if (input.inputs) {
          const inputs = defaultValues.columns.map((col, idx) => {
            const newInputValues = {
              id: col.id,
              name: `column-${col.id}`,
              value: col.name,
              placeholder: col.name,
            };

            if (input.inputs && input.inputs[idx] != null) {
              return {
                ...input.inputs[idx],
                ...newInputValues,
              };
            }

            return {
              ...input.inputs[0],
              ...newInputValues,
            };
          });
          return { ...input, inputs };
        }
        return {
          ...input,
          name: 'name',
          id: defaultValues.id,
          value: defaultValues.name,
          placeholder: defaultValues.name,
        };
      });

      setFormInputs(newFormInputs);

      return {
        name: newFormInputs[0].value,
        ...newFormInputs[1].inputs?.reduce((acc: any, curr) => {
          acc[curr.name] = curr.value;
          return acc;
        }, {}),
      };
    }
    return null;
  });

  const colsSchema = colsKeys?.reduce((acc: any, curr: any) => {
    acc[curr] = Yup.string().min(3, 'please enter at least 3').required("Can't be empty");
    return acc;
  }, {});

  const BoardFormSChema = Yup.object().shape({
    name: Yup.string().min(3, 'please enter at least 3 characters').required("Can't be empty"),
    ...colsSchema,
  });

  const validateInput = (input: string, getFieldMeta: any) => {
    return !!getFieldMeta(input).touched && !getFieldMeta(input).error;
  };

  const createNewColumn = () => {   
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const inpLength = input.inputs.length;
        let newInnerInput;
        if (inpLength === 0 && boardFormInfo[1].inputs) {
          newInnerInput = boardFormInfo[1].inputs['0'];
        } else {
          newInnerInput = {
            ...input.inputs[inpLength - 1],
            name: `column-${Number(input.inputs[inpLength - 1].id) + 1}`,
            id: `${Number(input.inputs[inpLength - 1].id) + 1}`,
            value: '',
            placeholder: '',
          };
        }
        return { ...input, inputs: [...input.inputs, newInnerInput] };
      }
      return input;
    });

    setFormInputs(newFormInputs);
  };

  const removeColumn = (id: string) => {   
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const inputs = input.inputs.filter((inp) => inp.id !== id);
        inputs.map((innerInput, idx) => {
          innerInput = {
            ...innerInput,
            value: innerInput.value,
          };         
          return innerInput;
        });

        return { ...input, inputs };
      }
      return input;
    });

    setFormInputs(newFormInputs);   
  };

  const onCreateBoard = (
    values: CreateNewBoardValue,
    { setSubmitting }: FormikHelpers<CreateNewBoardValue>,
  ) => {      

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key]) => formInputs[1].inputs && formInputs[1].inputs.some((input) => input.name === key),
      ),
    );    

    const colsNames: string[] = Object.values(filteredValues);
    const existCols = defaultValues?.columns.filter((col) => {
      return formInputs[1].inputs?.map((i) => i.id).includes(col.id);
    });

    dispatch(
      createNewBoard({
        id: `${defaultValues?.id}`,
        name: values.name,
        columns: colsNames.map((name, idx) => {
          return {
            id: `${idx + 1}`,
            name,
            tasks: (existCols && existCols[idx]?.tasks) || [],
          };
        }),
      }),
    );
    setSubmitting(false);
  };

  console.dir({ formInputs, defaultValues, initialValues });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BoardFormSChema}
      onSubmit={onCreateBoard}
    >
      {({ isSubmitting, getFieldMeta, values, handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-6">
          {formInputs.map((input) => {
            return (
              <InputControl key={input.label}>
                <label className="text-body-xs font-bold text-text-base" htmlFor={`${input.id}`}>
                  {input.label}
                </label>

                {!input.inputs ? (
                  <div className="relative">
                    <InputField
                      className={`${
                        validateInput(input.name, getFieldMeta)
                          ? 'border-primary-base'
                          : getFieldMeta(input.name).touched &&
                            getFieldMeta(input.name).error &&
                            'border-danger'
                      }`}
                      {...input}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessageWrapper input={input.name} />
                  </div>
                ) : (
                  input.inputs.map((innerInput) => (
                    <div
                      key={innerInput.name}
                      className="relative flex h-full w-full items-center justify-center gap-4"
                    >
                      <InputField
                        className={`${
                          validateInput(innerInput.name, getFieldMeta)
                            ? 'border-primary-base'
                            : getFieldMeta(innerInput.name).touched &&
                              getFieldMeta(innerInput.name).error &&
                              'border-danger'
                        }`}
                        {...innerInput}
                        value={values[innerInput.name] || undefined}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessageWrapper input={innerInput.name} hasIcon />

                      <button
                        type="button"
                        className="w-fit cursor-pointer"
                        onClick={() => removeColumn(innerInput.id)}
                      >
                        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                          <g fill="#828FA3" className="hover:fill-danger" fill-rule="evenodd">
                            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                          </g>
                        </svg>
                      </button>
                    </div>
                  ))
                )}

                {input.inputs && (
                  <Button type="secondary" withIcon iconSmall onClick={createNewColumn}>
                    Add New Column
                  </Button>
                )}
              </InputControl>
            );
          })}

          <Button submitBtn type="primary">
            {/* eslint-disable-next-line no-nested-ternary */}
            {isSubmitting ? 'Loading' : defaultValues ? 'Save Board' : 'Create New Board'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
