import * as Yup from 'yup';

export function transformColumnsInputsToObject(
  inputs: any[] | undefined,
  value?: string | Yup.StringSchema<string, Yup.AnyObject, undefined, ''>,
) {
  if (inputs != null) {
    // If value is null or undefined, return an object with
    // the inputs names as keys and the inputs values as values
    if (!value) {
      return inputs.reduce((acc: any, input: any) => {
        console.log(input);
        acc[input?.name] = input?.value;
        return acc;
      }, {});
    }
    // console.log(inputs, value);

    inputs = inputs.map((input) => input.name);
    return inputs.reduce((acc, input) => {
      acc[input] = value;
      return acc;
    }, {});
  }

  return {};
}
