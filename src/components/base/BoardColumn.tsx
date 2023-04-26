export function BoardColumn({ column }: any) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-base font-bold text-text-muted">
        {column.name} ({column.tasks.length})
      </h2>

      <div className="flex flex-col gap-4">
        {column.tasks.map((task: any) => (
          <div
            key={task.id}
            className="flex w-[280px] max-w-[280px] flex-col gap-2.5 rounded-md bg-background-primary px-3 py-4"
          >
            <h3 className="text-base font-bold text-text-base">{task.title}</h3>
            <p className="text-body-sm text-text-muted">
              {`${task.subtasks.filter((subtask: any) => subtask.isCompleted).length} `}
              of
              {` ${task.subtasks.length} `}
              subtasks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
