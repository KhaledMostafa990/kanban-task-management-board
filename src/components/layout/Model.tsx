'use client';

import { boards } from '@/app/store/data.json';
import { useState } from 'react';
import {
  CreateBoard,
  CreateTask,
  DeleteBoard,
  DeleteTask,
  EditBoard,
  EditTask,
  Overlay,
  ViewTask,
} from '../base';

export default function Model() {
  const [modelOpen] = useState<boolean>(false);
  const [currentView] = useState<string>('createTask');

  const firstBoard = boards[0];
  const taskExample = boards[0].columns[1].tasks[5];
  const { columns } = firstBoard;

  const modelContents = {
    createTask: <CreateTask />,
    viewTask: <ViewTask task={taskExample} columns={columns} />,
    editTask: <EditTask task={taskExample} columns={columns} />,
    deleteTask: <DeleteTask task={taskExample} columns={columns} />,

    createBoard: <CreateBoard />,
    editBoard: <EditBoard board={firstBoard} />,
    deleteBoard: <DeleteBoard board={firstBoard} columns={columns} />,
  };

  if (!modelOpen) return null;

  return (
    <div className="bg-text-muted/50 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
      <Overlay />

      <div className=" absolute top-[11%] z-50 flex w-[340px] flex-col gap-6 bg-background-primary px-4 py-6 lg:w-[480px]">
        {modelContents[currentView as keyof typeof modelContents]}
      </div>
    </div>
  );
}
