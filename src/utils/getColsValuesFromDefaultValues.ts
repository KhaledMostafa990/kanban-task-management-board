export function getColsValuesFromDefaultValues(values: any, input: any) {
  const inputs = values.map((value: any, idx: number) => {
    const newInputValues = {
      id: value.id,
      name: `column-${value.id}`,
      value: value.title || value.name,
      placeholder: value.title || value.name,
    };

    // if the input is not null, then it's an existing subtask that we want to update
    if (input.inputs && input.inputs[idx] != null) {
      return { ...input.inputs[idx], ...newInputValues };
    }

    // if the input is null, then it's a new subtask that we want to create
    return { ...input.inputs[0], ...newInputValues };
  });

  return inputs;
}
