export const validateInput = (input: string, getFieldMeta: any) =>
  !!getFieldMeta(input).touched && !getFieldMeta(input).error;
