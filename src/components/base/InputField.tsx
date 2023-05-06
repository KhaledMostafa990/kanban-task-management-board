import { Field } from 'formik';

export function InputField({
  type,
  id,
  name,
  placeholder,
  value,
  className,
  onChange,
  onBlur,
  children,
}: {
  type: string;
  id?: string;
  name: string;
  placeholder: string;
  value: string | null | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) {
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
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      children={children}
    />
  );
}
