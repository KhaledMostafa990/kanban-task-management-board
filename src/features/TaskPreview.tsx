import { useAppDispatch, toggleSubTaskStatus, toggleTaskStatus, useAppSelector } from '@/app/store';
import { Column, Task } from '@/app/types';
import { SettingModal } from '@/features/SettingModal';
import { useState } from 'react';
import { SubTaskCounter, SubTaskCheckbox } from '@/components/task';
import { ArrowIcon } from '@/components/icons';

export function TaskPreview({ task, columns }: { task: Task | null; columns: Column[] }) {
  const dispatch = useAppDispatch();
  const currentColumn = useAppSelector((state) =>
    state.boardSidebar.activeBoard.columns.find((col) => col.name === task?.status),
  );
  const [taskSettingOpen, setTaskSettingOpen] = useState<boolean>(false);

  const taskSettings = ['Edit Task', 'Delete Task'];

  const showTaskSetting = () => setTaskSettingOpen(!taskSettingOpen);

  const handleSubTaskStatus = (subtaskId: string) => {
    const colId = currentColumn?.id!;
    const taskId = task?.id as string;
    dispatch(toggleSubTaskStatus({ colId, taskId, subtaskId }));
  };

  const handleTaskStatus = (taskId: string, nextCol: string, currentCol: string) => {
    nextCol = columns.filter((col) => col.name === nextCol)[0].id as string;
    dispatch(toggleTaskStatus({ currentCol, nextCol, taskId }));
  };

  return (
    <>
      <div className="relative flex items-center justify-between gap-2.5">
        <h2 className="text-lg font-bold text-text-base">{task?.title}</h2>
        <SettingModal
          isOpen={taskSettingOpen}
          settingList={taskSettings}
          onOpenSettings={showTaskSetting}
        />
      </div>

      <p className="text-bdoy-sm text-text-muted">{task?.description}</p>

      <h3 className="text-base font-bold text-text-base">
        <SubTaskCounter task={task} />
      </h3>

      <div className="flex flex-col items-start gap-2.5">
        {task?.subtasks.map((subTask) => (
          <SubTaskCheckbox key={subTask.title} subTask={subTask} onCheck={handleSubTaskStatus} />
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-base font-bold text-text-base select-none">Current Status</h3>
        <div className='relative'>
          <ArrowIcon className="absolute top-[50%] right-6 translate-y-[-50%]" />

          <select
            value={currentColumn?.name}
            onChange={(e) => handleTaskStatus(task?.id as string, e.target.value, currentColumn?.id!)}
            className="h-[40px] w-full rounded-md bg-background-secondary px-2 text-text-base appearance-none py-2 px-2.5"
          >
            {columns.map((column: any) => (
              <option key={column.name} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
