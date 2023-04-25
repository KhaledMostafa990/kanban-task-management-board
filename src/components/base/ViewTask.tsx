export function ViewTask({
  task,
  columns,
}: {
  task: {
    title: string;
    description: string;
    status: string;
    subtasks: { title: string; isCompleted: boolean }[];
  };
  columns: any[];
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">{task.title}</h2>

      <p className="text-bdoy-sm text-text-muted">{task.description}</p>

      <h3 className="text-base font-bold text-text-base">
        {`Subtasks (${task.subtasks.filter((subtask: any) => subtask.isCompleted).length} of ${
          task.subtasks.length
        })`}
      </h3>

      <div className="flex flex-col gap-2.5">
        {task.subtasks.map((subTask) => (
          <button
            key={subTask.title}
            className="flex flex-row-reverse gap-2 bg-background-secondary px-2 py-2.5 hover:bg-primary-25 "
          >
            <label
              htmlFor="subtask"
              className="text-bold cursor-pointer text-body-xs font-bold text-text-muted"
            >
              {subTask.title}
            </label>

            <input type="checkbox" id="subtask" name="subtask" checked={subTask.isCompleted} />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-base font-bold text-text-base">Current Status</h3>
        <select className="h-[40px] w-full rounded-md bg-background-secondary px-2 text-text-base">
          {columns.map((column: any) => (
            <option key={column.name} value={column.name}>
              {column.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
