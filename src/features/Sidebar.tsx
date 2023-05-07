'use client';

import { useAppSelector, useAppDispatch } from '@/app/store';
import {
  openBoardModel,
  toggleActiveBoard,
  toggleSidebar,
  toggleTheme,
} from '@/app/store/boardSlice';

import { BoardListItem } from '@/components/base';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSidebar.boards);
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);
  const isSidebarOpen = useAppSelector((state) => state.boardSidebar.sidebarActive);

  const sidebarState = isSidebarOpen && 'active';
  const activeTheme = useAppSelector((state) => state.boardSidebar.theme);

  function toggleActiveTheme(e: any) {
    if (e.target.value === 'dark') {
      dispatch(toggleTheme('light'));
    } else {
      dispatch(toggleTheme('dark'));
    }
  }

  return (
    <aside
      id="sidebar"
      className={`${sidebarState} absolute left-0 top-[10%] z-40 flex h-fit w-[65%] max-w-[450px]
      flex-1 translate-x-[-100%] flex-col gap-6 rounded-md bg-background-primary py-6
      transition-transform md:top-0 md:h-[calc(100vh-93px)] md:min-w-[260px] md:max-w-[260px] md:justify-between md:rounded-none
      [&.active]:left-[50%] [&.active]:translate-x-[-50%] md:[&.active]:relative md:[&.active]:left-0 md:[&.active]:translate-x-0`}
    >
      <div className="flex flex-col gap-6">
        <p className="pl-6 text-body-xs text-text-muted">All Boards {`(${boards.length})`}</p>

        {/* Boards List */}
        <ul className="flex flex-col gap-4">
          {boards.map((board) => (
            <li key={board.name}>
              <BoardListItem
                onClick={() => dispatch(toggleActiveBoard(board.name))}
                className={`${board.name === activeBoard.name && 'active'}`}
              >
                {board.name}
              </BoardListItem>
            </li>
          ))}

          <li>
            <BoardListItem onClick={() => dispatch(openBoardModel('createBoard'))}>
              Create New Board
            </BoardListItem>
          </li>
        </ul>
      </div>

      <div className="relative md:flex md:flex-col md:gap-5">
        {/* Toggle Theme */}
        <div className="px-6">
          <div className="flex w-full items-center justify-center gap-4 rounded-md bg-background-secondary py-3 px-4">
            <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z"
                fill="#828FA3"
              />
            </svg>

            <button className="pointer-events-auto h-fit w-fit rounded-full bg-primary-base p-1 xl:p-1.5">
              <input
                id="toggle-checkbox"
                type="checkbox"
                value={activeTheme}
                onClick={toggleActiveTheme}
                checked={activeTheme === 'dark'}
                className="relative block h-6 min-h-full w-12 min-w-full cursor-pointer appearance-none rounded-full bg-primary-base
              before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-white before:shadow-md
              before:shadow-neutral-500 before:transition-transform before:duration-500 checked:before:translate-x-full"
              />

              <label htmlFor="toggle-checlbox" className="sr-only">
                toggle pricing card from monthly to annual
              </label>
            </button>

            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z"
                fill="#828FA3"
              />
            </svg>
          </div>
        </div>

        {/* Toggle Sidebar on tablet & desktop */}
        <div className="hidden items-center justify-center pr-6 md:flex">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={`${sidebarState} relative left-[72%] flex items-center justify-center gap-4 rounded-tr-full rounded-br-full
            bg-primary-base px-5 py-3 text-text-muted transition-all hover:bg-btn-primary-hover [&.active]:static
            [&.active]:left-[unset] [&.active]:w-full [&.active]:bg-transparent [&.active]:hover:bg-btn-secondary
            `}
          >
            {isSidebarOpen ? (
              <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z"
                  fill="#828FA3"
                />
              </svg>
            ) : (
              <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                  fill="#FFF"
                />
              </svg>
            )}
            <span className={`${sidebarState} hidden text-xs [&.active]:inline-block`}>
              Hide Sidebar
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
