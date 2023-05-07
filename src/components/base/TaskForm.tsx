/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';
import React, { useState } from 'react';
import { taskFormInfo } from '@/app/store/CONSTANT';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { ErrorMessageWrapper } from './ErrorMessageWrapper';
import { Button } from './Button';
import { InputControl } from './InputControl';
import { Column, Task } from '@/app/types';
import { InputField } from './InputField';
import {  saveTask } from '@/app/store/boardSlice';

interface CreateNewTaskValue {
  title: string;
  description: string;
  status: string;
  [key: string]: string;
}

export function TaskForm(
  { defaultValues, columns, boardName }:
  { defaultValues?: Task | null , columns: Column[], boardName: string}
  ) {
  const dispatch = useAppDispatch();
  
  const statusOptions = columns.map((col) => col.name);
  
  const [formInputs, setFormInputs] = useState(taskFormInfo);

  const colsKeys = formInputs
    .filter((input) => input.inputs?.map((inp) => inp.name))[0]
    .inputs?.map((i) => i.name);

  const [initialValues] = useState<CreateNewTaskValue>(() => {
    if (defaultValues == null) {
      return {
        title: '',
        description: '',
        status: statusOptions[0],
        ...colsKeys?.reduce((acc: any, curr) => {
          acc[curr] = '';
          return acc;
        }, {}),
      };
    }
    if (formInputs[2].inputs && defaultValues != null) {
      const newFormInputs = formInputs.map((input) => {
        if (input.inputs) {
          const inputs = defaultValues.subtasks.map((subTask, idx) => {
            const newInputValues = {
              id: subTask.id,
              name: `column-${subTask.id}`,
              value: subTask.title,
              placeholder: subTask.title,
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

        if (input.type === 'select') {
          return {
            ...input,
            value: defaultValues.status,
          };
        }

        return {
          ...input,
          value: input.name === 'title' ? defaultValues.title : defaultValues.description,
        };
      });

      setFormInputs(newFormInputs);

      return {
        title: newFormInputs[0].value,
        description: newFormInputs[1].value,
        status: newFormInputs[3].value,
        ...newFormInputs[2].inputs?.reduce((acc: any, curr) => {
          acc[curr.name] = curr.value;
          return acc;
        }, {}),
      };
    }
    return null;
  });

  const colsSchema = colsKeys?.reduce((acc: any, curr: any) => {
    acc[curr] = Yup.string().min(3, 'please enter at least 3 characters').required("Can't be empty");
    return acc;
  }, {});

  const TaskFormSChema = Yup.object().shape({
    title: Yup.string().min(3, 'please enter at least 3 characters').required("Can't be empty"),
    description: Yup.string().min(10, 'please enter at least 10 characters'),
    status: Yup.string().required("please select a status"),
    ...colsSchema,
  });

  const validateInput = (input: string, getFieldMeta: any) => {
    return !!getFieldMeta(input).touched && !getFieldMeta(input).error;
  };

  const createNewColumn = () => {
    console.dir('On Add: \n', { formInputs, defaultValues, initialValues });
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const inpLength = input.inputs.length;
        let newInnerInput;
        if (inpLength === 0 && formInputs[1].inputs) {
          newInnerInput = formInputs[1].inputs['0'];
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
    console.log('On Revmoe: \n');
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        const inputs = input.inputs.filter((inp) => inp.id !== id);
        inputs.map((innerInput, idx) => {
          innerInput = {
            ...innerInput,
            value: innerInput.value,
          };
          console.log(innerInput, idx);
          return innerInput;
        });

        return { ...input, inputs };
      }
      return input;
    });

    setFormInputs(newFormInputs);
    console.dir({ id, formInputs, defaultValues, initialValues });
  };

  const onSave = (
    values: CreateNewTaskValue,
    { setSubmitting }: FormikHelpers<CreateNewTaskValue>,
  ) => {
    console.log('On Create: \n');
    console.dir({ values, formInputs, defaultValues, initialValues });

    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([key]) => formInputs[2].inputs && formInputs[2].inputs.some((input) => input.name === key),
      ),
    );

    const colsNames: string[] = Object.values(filteredValues);
    const existCols = defaultValues?.subtasks.filter((subtask) => {
      return formInputs[2].inputs?.map((i) => i.id).includes(subtask.id);
    });
    console.dir({ colsNames, existCols, filteredValues, values, formInputs, defaultValues });

    dispatch(
      saveTask({
        task: {
          id: defaultValues?.id || `${Date.now()}`,
          title: values.title,
          description: values.description,
          status: values.status,
          subtasks: colsNames.map((title, idx) => {
            return {
              id: `${idx + 1}`,
              title,
              isCompleted: existCols?.[idx]?.isCompleted || false,            
            };
          }),
        }}
      )
    );
    setSubmitting(false);
  };
  // console.dir({ formInputs, defaultValues, initialValues });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskFormSChema}
      onSubmit={onSave}
    >
      {({ isSubmitting, getFieldMeta, values, handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-8">
          {formInputs.map((input) => (
            <InputControl key={input.label}>
              <label className="text-body-xs font-bold text-text-base" htmlFor={`${input.id}`}>
                {input.label}
              </label>

              {!input.inputs && input.type !== 'select' ? (
                <div className="relative">
                <InputField
                  className={`${
                    validateInput(input.name, getFieldMeta)
                      ? 'border-primary-base'
                      : getFieldMeta(input.name).touched &&
                        getFieldMeta(input.name).error &&
                        'border-danger'
                  }`}
                  type={input.type}
                  id={input.id}
                  name={input.name}
                  value={values[input.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={input.placeholder || ''}
                />
                <ErrorMessageWrapper input={input.name} hasIcon />
                </div>

              ) : input.type === 'select' ? (
                <div className="relative">
                  <svg
                    className="absolute top-[50%] right-6 translate-y-[-50%]"
                    width="10"
                    height="7"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
                  </svg>

                  <InputField
                    className=" w-full appearance-none border border-border-input bg-transparent 
                      py-2 px-2.5 text-body-sm text-text-base placeholder:text-body-sm placeholder:text-text-base
                      placeholder:opacity-25"
                    name={input.name}
                    type={input.type}
                    id={input.id}
                    value={values[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={input.placeholder || ''}
                  >
                    {statusOptions.map((option) => (
                      <option
                        className="appearance-none bg-background-primary py-2 px-2.5 text-text-muted"
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}                                          
                  </InputField>
                  <ErrorMessageWrapper input={input.name} hasIcon />
                </div>
              ) : (
                input.inputs?.map((innerInput) => (
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
          ))}

          <Button submitBtn type="primary">
            {/* eslint-disable-next-line no-nested-ternary */}
            {isSubmitting ? 'Loading' : defaultValues ? 'Save Task' : 'Create New Task'}
          </Button>
        </Form>
      )}
    </Formik>    
  );
}
