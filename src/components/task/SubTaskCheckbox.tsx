import { SubTask } from '@/app/types';
import React from 'react';

export function SubTaskCheckbox({
  subTask,
  onCheck,
}: {
  subTask: SubTask;
  onCheck: (subtaskId: string) => void;
}) {
  return (
    <div
      className="inline-block flex cursor-pointer gap-2 bg-background-secondary px-2 py-2.5 hover:bg-primary-25"
      onClick={() => onCheck(subTask.id)}
    >
      <input
        onChange={() => onCheck(subTask.id)}
        type="checkbox"
        id={`subtask-${subTask.id}`}
        name={`subtask-${subTask.id}`}
        checked={subTask.isCompleted}
      />
      <label
        htmlFor={`subtask-${subTask.id}`}
        className="text-bold cursor-pointer select-none text-body-xs font-bold text-text-muted"
      >
        {subTask.title}
      </label>
    </div>
  );
}
