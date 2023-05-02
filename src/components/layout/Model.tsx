'use client';

import { boards } from '@/app/store/data.json';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { toggleModelView } from '@/app/store/boardSlice';
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
  const modelOpen = useAppSelector((state) => state.boardSidebar.models.open);
  const modelView = useAppSelector((state) => state.boardSidebar.models.modelView);
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);
  const dispatch = useAppDispatch();
  // console.log(activeBoard)
  const firstBoard = boards[0];
  const taskExample = boards[0].columns[1].tasks[5];
  const { columns } = firstBoard;

  const modelContents = {
    createTask: <CreateTask />,
    viewTask: <ViewTask task={taskExample} columns={columns} />,
    editTask: <EditTask task={taskExample} columns={columns} />,
    deleteTask: <DeleteTask task={taskExample} columns={columns} />,

    createBoard: <CreateBoard />,
    editBoard: <EditBoard board={activeBoard} />,
    deleteBoard: <DeleteBoard board={activeBoard} />,
  };

  if (!modelOpen) return null;

  return (
    <div className="bg-text-muted/50 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
      <Overlay onClick={() => dispatch(toggleModelView())} />

      <div className=" absolute top-[11%] z-50 flex w-[340px] flex-col gap-6 bg-background-primary px-4 py-6 lg:w-[480px]">
        {modelContents[modelView as keyof typeof modelContents]}
      </div>
    </div>
  );
}
