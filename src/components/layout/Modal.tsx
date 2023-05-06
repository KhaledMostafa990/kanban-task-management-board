'use client';

// import { boards } from '@/app/store/data.json';
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
  const activeTask = useAppSelector((state) => state.boardSidebar.activeTask);

  const dispatch = useAppDispatch();

  if (!activeBoard) return null;

  const modelContents = {
    createTask: <CreateTask columns={activeBoard.columns} boardName={activeBoard.name} />,
    viewTask: <ViewTask task={activeTask} columns={activeBoard.columns} />,
    editTask: <EditTask task={activeTask} columns={activeBoard.columns} boardName={activeBoard.name} />,
    deleteTask: <DeleteTask task={activeTask} columns={activeBoard.columns}  />,

    createBoard: <CreateBoard />,
    editBoard: <EditBoard board={activeBoard} />,
    deleteBoard: <DeleteBoard board={activeBoard} />,
  };

  // console.log(modelView, modelOpen, activeBoard, activeTask);
  if (!modelOpen) return null;

  return (
    <div className="bg-text-muted/50 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-y-scroll">
      <Overlay onClick={() => dispatch(toggleModelView())} />

      <div className=" absolute top-[11%] z-50 flex w-[340px] flex-col gap-6 bg-background-primary px-4 py-6 lg:w-[480px]">
        {modelContents[modelView as keyof typeof modelContents]}
      </div>
    </div>
  );
}
