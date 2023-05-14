import { Field } from 'formik';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function InputField({ type, className, ...props }: InputFieldProps) {
  return (
    <Field
      className={`w-full border border-border-input bg-transparent py-3 px-4 text-body-sm text-text-base
      outline-none placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25
      hover:border-primary-25 focus:border-primary-75 active:bg-transparent
      ${className}`}
      type={type}
      cols={type === 'textarea' ? 15 : undefined}
      rows={type === 'textarea' ? 4 : undefined}
      as={type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input'}
      {...props}
    />
  );
}
