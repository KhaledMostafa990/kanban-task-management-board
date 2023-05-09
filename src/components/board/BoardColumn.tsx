export function BoardColumn({
  columnName,
  tasksLength,
  children
 } : {
  columnName: string,
  tasksLength: string,
  children: React.ReactNode
}) {

  return (
    <div className="flex flex-col gap-6 min-w-[280px]">
      <h2 className="text-base font-bold text-text-muted">
        {columnName} ({tasksLength})
      </h2>

      <div className="flex flex-col gap-4">
        {children}       
      </div>
    </div>
  );
}
