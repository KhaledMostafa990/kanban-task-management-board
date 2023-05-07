import { useAppDispatch } from '@/app/store/store';
import { openBoardModal, setActiveTask } from '@/app/store/boardSlice';
import { Column } from '@/app/types';

export function BoardColumn({ column }: { column: Column }) {
  const dispatch = useAppDispatch();
  const onOpenTask = (dataId: string) => {
    dispatch(setActiveTask({
      colId: column.id,
      taskId: dataId,
    }));
    dispatch(openBoardModal('viewTask'));
  };
  return (
    <div className="flex flex-col gap-6 min-w-[280px]">
      <h2 className="text-base font-bold text-text-muted">
        {column.name} ({column.tasks.length})
      </h2>

      <div className="flex flex-col gap-4">
        {column.tasks.map((task: any) => (
          <button
            tabIndex={0}
            key={task.id}
            onClick={() => onOpenTask(task.id)}
            className="text-start flex w-[280px] max-w-[280px] cursor-pointer flex-col gap-2.5 rounded-md bg-background-primary px-3
            py-4 transition-all duration-300 hover:translate-y-[-3%] hover:translate-x-[2%] hover:shadow-md hover:shadow-background-primary"
          >
            <h3 className="text-base font-bold text-text-base">{task.title}</h3>
            <p className="text-body-sm text-text-muted">
              {`${task.subtasks.filter((subtask: any) => subtask.isCompleted).length} `}
              of
              {` ${task.subtasks.length} `}
              subtasks
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
