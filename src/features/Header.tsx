'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/store';

import { openBoardModal, toggleSidebar } from '@/app/store/boardSlice';
import { Button, Logo } from '@/components/base';
import { Row } from '@/components/layout';
import { SettingModal } from './SettingModal';

export default function Header() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);
  const [boardSettingOpen, setBoardSettingOpen] = useState<boolean>(false);

  const boardSettings = ['Edit Board', 'Delete Board'];

  const showBoardSettings = () => {
    setBoardSettingOpen(!boardSettingOpen);
  };

  return (
    <header
      className={`z-30 flex w-full border-b border-border-base bg-background-primary shadow-sm`}
    >
      <div className="hidden min-w-[260px] justify-center border-r border-border-base md:flex">
        <Logo />
      </div>

      <div className="container py-6">
        <Row className="flex items-center justify-between">
          {/* Board Heading */}
          <h1
            className="flex w-[calc(100%/1.80)] max-w-fit items-center gap-1.5 text-text-base"
            title={`${activeBoard?.name || 'No Board Available Yet'}`}
          >
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl md:w-full">
              {activeBoard?.name || 'No Board Available Yet'}
            </span>

            {activeBoard?.name && (
              <svg
                onClick={() => dispatch(toggleSidebar())}
                className="cursor-pointer md:hidden"
                width="10"
                height="7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
              </svg>
            )}
          </h1>

          <div className="flex items-center justify-center gap-4">
            {/* Add Task Button */}
            <Button type="primary" withIcon onClick={() => dispatch(openBoardModal('createTask'))}>
              Add New Task
            </Button>

            <div className="relative">
              {/* Board settings */}
              <SettingModal
                isOpen={boardSettingOpen}
                settingList={boardSettings}
                onOpenSettings={showBoardSettings}                
              />
            </div>
          </div>
        </Row>
      </div>
    </header>
  );
}
