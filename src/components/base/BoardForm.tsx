import React, { useState } from 'react';
import * as Yup from 'yup';

import { boardFormInfo } from '@/app/store/CONSTANT';
import { useAppDispatch } from '@/app/store';
import { Form, Formik, FormikHelpers } from 'formik';
import { createNewBoard } from '@/app/store/boardSlice';
import { Button } from './Button';
import { Board } from '../../app/types';
import { InputControl } from './InputControl';
import { InputField } from './InputField';
import { ErrorMessageWrapper } from './ErrorMessageWrapper';

interface CreateNewBoardValue {
  name: string;
  [key: string]: string;
}

export function BoardForm({ defaultValues }: { defaultValues?: Board | undefined }) {
  const [formInputs, setFormInputs] = useState(boardFormInfo);
  const dispatch = useAppDispatch();

  const colsValues = formInputs
    .filter((input) => input.inputs?.map((inp) => inp.name))[0]
    .inputs?.map((i) => i.name);

  const colsSchema = colsValues?.reduce((acc: any, curr) => {
    acc[curr] = Yup.string().min(4, 'please enter at least 4');
    return acc;
  }, {});

  const BoardFormSChema = Yup.object().shape({
    name: Yup.string().min(4, 'please enter at least 4 characters').required("Can't be empty"),
    ...colsSchema,
  });
  let initialColsValues;

  if(defaultValues) {
    console.log(formInputs);
    const colsInputs = formInputs[1].inputs;
    if(colsInputs && defaultValues.columns.length > colsInputs.length) {
      defaultValues.columns.forEach((col, idx) => {        
        if(colsInputs.length -1 < idx) {
          const newInput = colsInputs[idx - 1];
          // console.log(formInputs,  col.name , newInput);
          formInputs[1].inputs = [ ...colsInputs, { 
              ...newInput,
              name:`column-${idx+1}`,
              id:`${idx+1}`
            }
          ];
          // console.log(formInputs,  col.name , newInput);
          setFormInputs(formInputs)
          // console.log(newInput, formInputs);
          }
      })
    }

    initialColsValues = defaultValues.columns.map(col => col.name).reduce((acc: any, curr) => {
      acc[curr] = curr;
      return acc
    }, {})        
  } else {
    initialColsValues = colsValues?.reduce((acc: any, curr) => {
      acc[curr] = '';
      return acc;
    }, {})
  }

  const initialValues = {
        name: defaultValues?.name || '',
        ...initialColsValues,
  }


  const onCreateBoard = async (
    values: CreateNewBoardValue,
    { setSubmitting }: FormikHelpers<CreateNewBoardValue>,
  ) => {
    const cols = Object.entries(values)
      .filter(([key]) => key.startsWith('column-'))
      .map(([, value]) => value && value.trim());

    dispatch(
      createNewBoard({
        name: values.name,
        columns: cols.map((colName) => {
          return { name: colName, tasks: [] };
        }),
      }),
    );
    setSubmitting(false);
  };

  const validateInput = (input: string, getFieldMeta: any) => {
    return !!getFieldMeta(input).touched && !getFieldMeta(input).error;
  };

  function createNewColumn () {
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const inpLength = input.inputs.length;
        let newInput;
        if (inpLength === 0 && boardFormInfo[1].inputs) {
          newInput = boardFormInfo[1].inputs['0'];
        } else {
          newInput = {
            ...input.inputs[0],
            name: `column-${inpLength + 1}`,
            id: `${inpLength + 1}`,
          };
        }
        return { ...input, inputs: [...input.inputs, newInput] };
      }
      return input;
    });

    setFormInputs(newFormInputs);
  };

  const removeColumn = (id: string) => {
    console.log(id);
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const newInputs = input.inputs.filter((inp) => inp.id !== id);
        return { ...input, inputs: newInputs };
      }
      return input;
    });

    setFormInputs(newFormInputs);
  };

  return (
    <Formik
      onSubmit={onCreateBoard}
      validationSchema={BoardFormSChema}
      initialValues={initialValues}
    >
      {({ isSubmitting, getFieldMeta }) => (
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
                      {...input}
                      value={defaultValues?.name || undefined}
                      className={`${
                        validateInput(input.name, getFieldMeta)
                          ? 'border-primary-base'
                          : getFieldMeta(input.name).touched &&
                            getFieldMeta(input.name).error &&
                            'border-danger'
                      }`}
                    />
                    <ErrorMessageWrapper input={input.name} />
                  </div>
                ) : (
                  input.inputs.map((inp, idx) => (
                    <div
                      key={inp.name}
                      className="relative flex h-full w-full items-center justify-center gap-4"
                    >
                      <InputField
                        {...inp}
                        value={defaultValues?.columns[idx].name ?? undefined}
                        className={`${
                          validateInput(inp.name, getFieldMeta)
                            ? 'border-primary-base'
                            : getFieldMeta(inp.name).touched &&
                              getFieldMeta(inp.name).error &&
                              'border-danger'
                        }`}
                      />
                      <ErrorMessageWrapper input={inp.name} hasIcon />

                      <button
                        type="button"
                        className="w-fit cursor-pointer"
                        onClick={() => removeColumn(inp.id)}
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
