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
}: {
  type: string;
  id?: string;
  name: string;
  placeholder: string;
  value: string | null | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <Field
      className={`w-full border border-border-input bg-transparent py-3 px-4 text-body-sm text-text-base
      outline-none placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25
      hover:border-primary-25 focus:border-primary-75 active:bg-transparent
      ${className}`}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
