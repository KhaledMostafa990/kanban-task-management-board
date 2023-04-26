'use client';
import {useState} from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';

import { toggleSidebar } from '@/app/store/boardSidebar';
import { Button, Logo } from '@/components/base';
import { Row } from '@/components/layout';

interface HeroProps extends React.HTMLAttributes<HTMLElement> {}

export default function Header(props: HeroProps) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(state => state.boardSidebar.activeBoard);
  const currentBoardName = activeBoard.name;
  const boardSettings = ['Edit Board', 'Delete Board'];
  const [boardSettingOpen, setBoardSettingOpen] = useState<boolean>(false); 
  // const boardSettingListRef = useRef<HTMLELement | null>(null);

  const showBoardSetting = () => {
    setBoardSettingOpen(!boardSettingOpen);
  }

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
            title={`${currentBoardName ?? 'No Board Available Yet'}`}
          >
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl md:w-full">
              {currentBoardName ?? 'No Board Available Yet'}
            </span>

            {currentBoardName && (
              <svg 
                onClick={() => dispatch(toggleSidebar())}
                className='cursor-pointer md:hidden' width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
              </svg>
            )}
          </h1>

          <div className="flex items-center justify-center gap-4">
            {/* Add Task Button */}
            <Button type="primary" withIcon>
              Add New Task
            </Button>

            <div className="relative">
              {/* Board settings */}
              <ul
                // ref={boardSettingListRef}
                className={`${boardSettingOpen && 'active'} z-50 absolute top-[calc(100%+2rem)] right-0 flex w-[200px] translate-x-[200%]
                flex-col gap-4 bg-background-primary p-3 transition-transform [&.active]:translate-x-0`}
              >
                {boardSettings?.map((setting, index) => (
                  <li
                    key={setting}
                    className={`${index % 2 === 0 ? 'text-text-muted' : 'text-secondary-base'}`}
                  >
                    {setting}
                  </li>
                ))}
              </ul>

              {/* settings icon */}
              <button onClick={showBoardSetting}>
                <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#828FA3" fillRule="evenodd">
                    <circle cx="2.308" cy="2.308" r="2.308" />
                    <circle cx="2.308" cy="10" r="2.308" />
                    <circle cx="2.308" cy="17.692" r="2.308" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </Row>
      </div>
    </header>
  );
}
