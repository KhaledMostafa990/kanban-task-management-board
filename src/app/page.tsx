'use client';

import { Button, BoardColumn, Board } from '@/components/base';

import { Row } from '@/components/layout';
import { useAppSelector, useAppDispatch } from './store/store';
import { openBoardModal, toggleModelView } from './store/boardSlice';
import { PlusIcon } from '../components/icons/PlusIcon';

export default function Home() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);

  if (!activeBoard) return <NoBoardsView dispatch={dispatch} />;

  if (activeBoard.columns.length === 0) return <EmptyBoardView dispatch={dispatch} />;  
  
  return <AvaliableBoardView activeBoard={activeBoard} dispatch={dispatch} />;
}


function AvaliableBoardView({activeBoard, dispatch} : { activeBoard: Board, dispatch: any}) {
  return (
    <section className="h-full w-full">
      <div className="container h-full min-h-max lg:w-full 2xl:w-[1111px]">
        <Row className="h-[calc(100vh-141px)] overflow-scroll ">
          <div className="flex h-full gap-6">
            {activeBoard.columns.map((column: any) => (
              <BoardColumn key={column.id} column={column} />
            ))}

            <div className="relative top-[43px] flex h-full min-w-[280px] items-center justify-center rounded-md bg-gradient-to-b from-background-primary">
              <button
                className="flex items-center justify-center gap-3 text-xl text-text-muted"
                onClick={() => dispatch(openBoardModal('editBoard'))}
              >
                <PlusIcon />
                New Column
              </button>
            </div>
          </div>
        </Row>
      </div>
    </section>
  );
}

function EmptyBoardView({ dispatch} : { dispatch: any}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-lg font-bold text-text-muted">
        This board is empty. Create a new column to get started.
      </h2>
      <Button type="primary" withIcon 
        onClick={() => dispatch(openBoardModal('editBoard'))}
      >
        Add New Column
      </Button>
    </div>
  );
}

function NoBoardsView({ dispatch} : { dispatch: any}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-lg font-bold text-text-muted">
        There is no board here yet. Create a new board to get started.
      </h2>
      <Button type="primary" withIcon
       onClick={() => dispatch(openBoardModal('createBoard'))}>
        Add New Board
      </Button>
    </div>
  );
}

