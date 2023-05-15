export function BoardColumn({
  columnName,
  tasksLength,
  children,
  index,
}: {
  columnName: string;
  tasksLength: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div className="flex min-w-[280px] flex-col gap-6">
      <h2 className="text-base font-bold text-text-muted flex items-center gap-2">
        <TasksListIndicator listNumber={Number(index - 1)} /> {columnName} ({tasksLength})
      </h2>

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}


function TasksListIndicator({listNumber}: {listNumber?: number}) {
  console.log('listNumber', listNumber);
  const colors = [
    'bg-sky-400',
    'bg-purple-400',
    'bg-green-400',
    'bg-amber-400',
    'bg-fuchsia-400',
  ];

  listNumber = listNumber ?? 0;
  listNumber = listNumber >= colors.length ? listNumber % colors.length : listNumber;
  const color = colors[listNumber];
  return (
    <span className={`${color} inline-block rounded-full w-3.5 h-3.5 `}></span>
  );
}