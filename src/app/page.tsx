'use client';

import { Button, BoardColumn } from '@/components/base';

import { Row } from '@/components/layout';
import { useAppSelector } from './store';

export default function Home() {
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);

  return !activeBoard ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-lg font-bold text-text-muted">
        There is no board here yet. Create a new board to get started.
      </h2>
      <Button type="primary" withIcon>
        Add New Board
      </Button>
    </div>
  ) : activeBoard.columns.length === 0 ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-lg font-bold text-text-muted">
        This board is empty. Create a new column to get started.
      </h2>
      <Button type="primary" withIcon>
        Add New Column
      </Button>
    </div>
  ) : (
    <>
      <section className="h-full w-full">
        <div className="container h-full min-h-max lg:w-full 2xl:w-[1111px]">
          <Row className="h-[calc(100vh-141px)] overflow-scroll">
            {activeBoard.columns.length === 0 ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-6">
                <h2 className="text-center text-lg font-bold text-text-muted">
                  This board is empty. Create a new column to get started.
                </h2>
                <Button type="primary" withIcon>
                  Add New Column
                </Button>
              </div>
            ) : (
              <div className="flex h-full gap-6">
                {activeBoard.columns.map((column: any) => (
                  <BoardColumn key={column.id} column={column} />
                ))}

                <div className="relative top-[53px] flex h-full min-w-[280px] items-center justify-center rounded-md bg-gradient-to-b from-background-primary">
                  <button className="flex items-center justify-center gap-3 text-xl text-text-muted">
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#828FA3"
                        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                      />
                    </svg>
                    New Column
                  </button>
                </div>
              </div>
            )}
          </Row>
        </div>
      </section>
    </>
  );
}
