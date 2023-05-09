'use client';

import { useAppDispatch, useAppSelector, toggleModelView } from '@/app/store';
import {Overlay} from '@/components/base';
import {CreateBoard,EditBoard,DeleteBoard,} from '@/components/board';
import {DeleteTask, CreateTask, EditTask, TaskPreview} from '@/components/task';

import { useEscapeListener } from '@/hooks/useEscapeListener';

export default function Modal() {
  const modelOpen = useAppSelector((state) => state.boardSidebar.models.open);
  const modelView = useAppSelector((state) => state.boardSidebar.models.modelView);
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);
  const activeTask = useAppSelector((state) => state.boardSidebar.activeTask);

  const dispatch = useAppDispatch();

  let modelContents: {[key: string]: JSX.Element} = {};

  if (activeBoard) {
    modelContents = {
      createTask: <CreateTask columns={activeBoard.columns} boardName={activeBoard.name} />,
      viewTask: <TaskPreview task={activeTask} columns={activeBoard.columns} />,
      editTask: <EditTask task={activeTask} columns={activeBoard.columns} boardName={activeBoard.name} />,
      deleteTask: <DeleteTask task={activeTask} columns={activeBoard.columns}  />,
  
      editBoard: <EditBoard board={activeBoard} />,
      deleteBoard: <DeleteBoard board={activeBoard} />,
    };
  }
  
  if (modelView === 'createBoard') modelContents[modelView] = <CreateBoard />;
  
  useEscapeListener({isModelOpen: modelOpen, toggleFunction: () => dispatch(toggleModelView())});

  if (!modelOpen) return null;
  

  return (
    <div
     className="bg-text-muted/50 fixed left-0 top-0 z-50 flex h-screen w-screen
    items-center justify-center overflow-y-scroll"
     >
      <Overlay onClick={() => dispatch(toggleModelView())} />

      <div className=" absolute top-[11%] z-50 flex w-[340px] flex-col gap-6 bg-background-primary px-4 py-6 lg:w-[480px]">
        {modelContents[modelView as keyof typeof modelContents]}
      </div>
    </div>
  );
}
