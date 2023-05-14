import { Task } from '@/app/types';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { SubTaskCounter } from './SubTaskCounter';

interface TaskCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  task: Task;
}

export function TaskCard({ task, ...props }: TaskCardProps) {
  return (
    <button
      className="flex w-[280px] max-w-[280px] cursor-pointer flex-col gap-2.5 rounded-md bg-background-primary px-3 py-4
      text-start transition-all duration-300 hover:translate-y-[-3%] hover:translate-x-[2%] hover:shadow-md hover:shadow-background-primary"
      {...props}
    >
      <h3 className="text-base font-bold text-text-base">{task.title}</h3>
      <p className="text-body-sm text-text-muted">
        <SubTaskCounter task={task} />
      </p>
    </button>
  );
}
