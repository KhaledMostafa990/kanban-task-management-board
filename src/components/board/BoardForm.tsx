import React, { useState } from 'react';
import * as Yup from 'yup';

import { boardFormInfo } from '@/app/store/CONSTANT';
import { useAppDispatch } from '@/app/store/store';
import { Form, Formik, FormikHelpers } from 'formik';
import { createNewBoard } from '@/app/store';
import { Board } from '@/app/types';
import { Button, InputControl, InputField, ErrorMessageWrapper } from '@/components/base';
import { createNewInput, getColsValuesFromDefaultValues, getFileteredInnerInputsValues, removeColumnInput, transformColumnsInputsToObject, validateInput } from '@/utils';

interface CreateNewBoardValue { 
  name: string;
  [key: string]: string;
}

export function BoardForm({ defaultValues }: { defaultValues?: Board }) {
  const dispatch = useAppDispatch();
  const [formInputs, setFormInputs] = useState(boardFormInfo);

  const [initialValues] = useState<CreateNewBoardValue>(() => {
    if (!defaultValues) {
      const columnsInputs = transformColumnsInputsToObject(formInputs[1].inputs, '');
      return {
        name: '',
        ...columnsInputs
      };
    }

    if (formInputs[1].inputs && defaultValues) {
      const newFormInputs = formInputs.map((input) => {
        if (input.inputs) {
          const inputs = getColsValuesFromDefaultValues(defaultValues.columns, input);
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
      const columnsInputs = transformColumnsInputsToObject(newFormInputs[1].inputs);

      return {
        name: newFormInputs[0].value,
        ...columnsInputs,
      };
    }
    return null;
  });

  const colsSchema = transformColumnsInputsToObject(
    formInputs[1].inputs,
    Yup.string().min(3, 'please enter at least 3').required("Can't be empty")
  );      

  const BoardFormSChema = Yup.object().shape({
    name: Yup.string().min(3, 'please enter at least 3 characters').required("Can't be empty"),
    ...colsSchema,
  });

  const createNewColumn = () => {   
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        let newInnerInput = createNewInput(boardFormInfo[1].inputs, input);
        return { ...input, inputs: [...input.inputs, newInnerInput] };
      }
      return input;
    });

    setFormInputs(newFormInputs);
  };

  const removeColumn = (id: string) => {   
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const inputs = removeColumnInput(input.inputs, id);
        return { ...input, inputs };
      }
      return input;
    });

    setFormInputs(newFormInputs);   
  };

  const onSave = (
    values: CreateNewBoardValue,
    { setSubmitting }: FormikHelpers<CreateNewBoardValue>,
  ) => {      
    const {
      filteredInnerInpsValues,
      existInpsValues
    } = getFileteredInnerInputsValues(formInputs[1].inputs, values, defaultValues?.columns);

    dispatch(
      createNewBoard({
        id: `${defaultValues?.id}`,
        name: values.name,
        columns: filteredInnerInpsValues.map((name, idx) => {
          return {
            id: `${idx + 1}`,
            name,
            tasks: (existInpsValues && existInpsValues[idx]?.tasks) || [],
          };
        }),
      }),
    );
    setSubmitting(false);
  };

  // console.dir({ formInputs, defaultValues, initialValues });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BoardFormSChema}
      onSubmit={onSave}
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
                          <g fill="#828FA3" className="hover:fill-danger" fillRule="evenodd">
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
