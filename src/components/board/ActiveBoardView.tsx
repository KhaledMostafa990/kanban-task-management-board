'use client';
import { BoardColumn } from '@/components/board';
import { Row } from '@/components/layout';
import { PlusIcon } from '@/components/icons';
import { Board } from '@/app/types';

export function ActiveBoardView({ onAddColumnClick, children }: { onAddColumnClick: any; children: React.ReactNode }) {
  return (
    <section className="h-full w-full">
      <div className="container h-full min-h-max lg:w-full 2xl:w-[1111px]">
        <Row className="h-[calc(100vh-141px)] overflow-x-scroll">
          <div className="flex  gap-6">
            {children}

            <div 
              className="relative top-[43px] flex min-h-[200px] min-w-[280px] items-center justify-center
              rounded-md bg-gradient-to-b from-background-primary"
            >
              <button
                className="flex items-center justify-center gap-3 text-xl text-text-muted"
                onClick={onAddColumnClick}
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
