'use client';

import { ButtonPrimary, Logo } from '@/components/base';
import { Row } from '@/components/layout';

interface HeroProps extends React.HTMLAttributes<HTMLElement> {}

// interface HeroData {
//   boardSettings?: string[];
//   currentBoardName?: string;
// }

export default function Header(props: HeroProps) {
  const boardSettings = ['Edit Board', 'Delete Board'];
  const currentBoardName = null;

  return (
    <header
      {...props}
      className={`z-30 flex w-full border-b border-border-base bg-background-primary py-6 shadow-sm`}
    >
      <div className="hidden w-[280px] justify-center md:flex">
        <Logo />
      </div>
      <div className="container">
        <Row className="flex items-center justify-between">
          {/* Board Heading */}
          <h1
            className="flex w-[calc(100%/1.80)] max-w-fit items-center gap-1.5 text-text-base"
            title={`${currentBoardName ?? 'No Board Available Yet'}`}
          >
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl md:w-full">
              {currentBoardName ?? 'No Board Available Yet'}
            </span>

            {!currentBoardName && (
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
              </svg>
            )}
          </h1>

          <div className="flex items-center justify-center gap-4">
            {/* Add Task Button */}
            <ButtonPrimary withIcon>Add New Task</ButtonPrimary>

            <div className="relative">
              {/* Board settings */}
              <ul
                className={`absolute top-[calc(100%+2rem)] right-0 flex w-[200px] translate-x-[200%] flex-col gap-4 bg-background-primary p-3 transition-transform [&.active]:translate-x-0`}
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
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fillRule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>
            </div>
          </div>
        </Row>
      </div>
    </header>
  );
}
