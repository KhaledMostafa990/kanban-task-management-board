/* eslint-disable no-nested-ternary */
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useAppDispatch, taskFormInfo, saveTask } from '@/app/store';
import { Column, Task } from '@/app/types';
import { Button, InputControl, InputField, ErrorMessageWrapper } from '@/components/base';
import { createNewInput, getColsValuesFromDefaultValues, getFileteredInnerInputsValues, removeColumnInput, transformColumnsInputsToObject, validateInput } from '@/utils';

interface CreateNewTaskValue {
  title: string;
  description: string;
  status: string;
  [key: string]: string;
}

export function TaskForm(
  { 
    defaultValues,
    columns 
  } : {
    defaultValues?: Task | null ,
    columns: Column[]
  }
  ) {
  const dispatch = useAppDispatch();
  const [formInputs, setFormInputs] = useState(taskFormInfo);
  const taskStatusOptions = columns.map((col) => col.name);

  const [initialValues] = useState<CreateNewTaskValue>(() => {
    if (defaultValues == null) {        
      const columnsInputs = transformColumnsInputsToObject(formInputs[2].inputs, '');
      return {
        title: '',
        description: '',
        status: taskStatusOptions[0],
        ...columnsInputs,
      };
    }

    if (formInputs[2].inputs && defaultValues != null) {
      const newFormInputs = formInputs.map((input) => {
        if (input.inputs) {
          const inputs = getColsValuesFromDefaultValues(defaultValues.subtasks, input);
          return { ...input, inputs };
        }

        if (input.type === 'select') input.value = defaultValues.status;
        if (input.type === 'textarea') input.value = defaultValues.description;
        if (input.type === 'text') input.value = defaultValues.title;
        return input;
      });

      setFormInputs(newFormInputs);

      const columnsInputs = transformColumnsInputsToObject(newFormInputs[2].inputs);

      return {
        title: newFormInputs[0].value,
        description: newFormInputs[1].value,
        status: newFormInputs[3].value,
        ...columnsInputs,
      };
    }
    return null;
  });

  const colsSchema = transformColumnsInputsToObject(
    formInputs[2].inputs, 
    Yup.string().min(3, 'please enter at least 3 characters').required("Can't be empty")
  );  

  const TaskFormSchema = Yup.object().shape({
    title: Yup.string().min(3, 'please enter at least 3 characters').required("Can't be empty"),
    description: Yup.string().min(10, 'please enter at least 10 characters'),
    status: Yup.string().required("please select a status"),
    ...colsSchema,
  });

  const createNewColumn = () => {
    const newFormInputs = formInputs.map((input) => {
      if (input.inputs) {
        let newInnerInput = createNewInput(taskFormInfo[2].inputs, input);
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
    values: CreateNewTaskValue,
    { setSubmitting }: FormikHelpers<CreateNewTaskValue>,
  ) => {
    console.log('On Create: \n');
    console.dir({ values, formInputs, defaultValues, initialValues });

    const {
      filteredInnerInpsValues,
      existInpsValues 
    } = getFileteredInnerInputsValues(formInputs[2].inputs, values, defaultValues?.subtasks);

    dispatch(
      saveTask({
        task: {
          id: defaultValues?.id || `${new Date().toISOString()}`,
          title: values.title,
          description: values.description,
          status: values.status,
          subtasks: filteredInnerInpsValues.map((title, idx) => {
            return {
              id: `${idx + 1}`,
              title,
              isCompleted: existInpsValues?.[idx]?.isCompleted || false,            
            };
          }),
        }}
      )
    );
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskFormSchema}
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
                    <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
                  </svg>

                  <InputField
                    className="appearance-none py-2 px-2.5"
                    type={input.type}
                    id={input.id}
                    name={input.name}
                    value={values[input.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {taskStatusOptions.map((option) => (
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
