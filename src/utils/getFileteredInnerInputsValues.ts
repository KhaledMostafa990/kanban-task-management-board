export function getFileteredInnerInputsValues(inputs: any, values: any, defaultValues: any) {
  const filteredColumnsValues = Object.fromEntries(
    Object.entries(values).filter(
      ([key]) => inputs && inputs.some((input: any) => input.name === key),
    ),
  );
  const filteredInnerInpsValues: any[] = Object.values(filteredColumnsValues);
  const subTasksIds = new Set(inputs?.map((i: any) => i.id));
  const existInpsValues = defaultValues?.filter((subtask: any) => subTasksIds.has(subtask.id));

  return {
    filteredInnerInpsValues,
    existInpsValues,
  };
}
