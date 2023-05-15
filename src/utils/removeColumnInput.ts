export function removeColumnInput(inputs: any, id: string) {
  inputs = inputs.filter((inp: any) => inp.id !== id);

  return inputs.map((innerInput: any, idx: number) => {
    innerInput = {
      ...innerInput,
      value: innerInput.value,
    };
    console.log(innerInput, idx);
    return innerInput;
  });
}
