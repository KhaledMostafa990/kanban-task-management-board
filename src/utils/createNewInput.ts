export function createNewInput(inputs: any, input: any) {
    const currentInputsLength = input.inputs.length;
    let newInput: any;

    if (currentInputsLength === 0) {
      newInput = inputs['0'];
    } else {
      console.log(input.inputs[currentInputsLength - 1], inputs, input)
      newInput = {
        ...input.inputs[currentInputsLength - 1],
        name: `column-${Number(input.inputs[currentInputsLength - 1].id) + 1}`,
        id: `${Number(input.inputs[currentInputsLength - 1].id) + 1}`,
        value: '',
        placeholder: '',
      };
    }

    return newInput;
}