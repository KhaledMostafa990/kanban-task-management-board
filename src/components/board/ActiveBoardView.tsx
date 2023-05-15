'use client';

import { Row } from '@/components/layout';
import { PlusIcon } from '@/components/icons';
import { useAppSelector } from '@/app/store';

export function ActiveBoardView({
  onAddColumnClick,
  children,
}: {
  onAddColumnClick: any;
  children: React.ReactNode;
}) {
  const isSidebarOpen = useAppSelector((state) => state.boardSidebar.sidebarActive);
  console.log('isSidebarOpen', isSidebarOpen);
  return (
    <section className="h-full w-full">
      <div className={`container h-full min-h-max lg:w-full pl-6 md:pl-0 ${!isSidebarOpen && 'md:pl-6'}`}>
        <Row className={`h-[calc(100vh-141px)] overflow-scroll  ${isSidebarOpen && 'md:max-w-[calc(100vw-302px)] mx-auto'}`}>
          <div className="flex  gap-4">
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
