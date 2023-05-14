'use client';

import {
  useAppSelector,
  useAppDispatch,
  openBoardModal,
  toggleActiveBoard,  
  toggleSidebar,
  toggleTheme,
} from '@/app/store';

import { BoardListItem } from '@/components/board';
import { Overlay } from '@/components/base';
import { useEscapeListener } from '@/hooks/useEscapeListener';
import { DarkThemeIcon, HideIcon, LightThemeIcon } from '@/components/icons';
import ShowIcon from '@/components/icons/ShowIcon';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSidebar.boards);
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);
  const isSidebarOpen = useAppSelector((state) => state.boardSidebar.sidebarActive);
  const isModelOpen = useAppSelector((state) => state.boardSidebar.models.open);

  const sidebarState = isSidebarOpen && 'active';
  const activeTheme = useAppSelector((state) => state.boardSidebar.theme);

  function toggleActiveTheme(e: any) {
    if (e.target.value === 'dark') {
      dispatch(toggleTheme('light'));
    } else {
      dispatch(toggleTheme('dark'));
    }
  }

  const onToggleSidebar = () => dispatch(toggleSidebar());

  const onToggleActiveBoard = (boardName: string) => dispatch(toggleActiveBoard(boardName));

  const onAddNewBoard = () => dispatch(openBoardModal('createBoard'));

  useEscapeListener({
    isModelOpen: isSidebarOpen && !isModelOpen ? isSidebarOpen : false,
    toggleFunction: () => dispatch(toggleSidebar())
  });


  return (
    <>

    {isSidebarOpen && <Overlay className='z-20 md:hidden' onClick={onToggleSidebar} /> }
    
    <aside
      id="sidebar"
      className={`${sidebarState} absolute left-0 top-[10%] z-40 flex h-fit w-[65%] max-w-[450px]
      flex-1 translate-x-[-100%] flex-col gap-6 rounded-md bg-background-primary py-6
      transition-transform md:top-0 md:h-[calc(100vh-93px)] md:min-w-[260px] md:max-w-[260px] md:justify-between md:rounded-none
      [&.active]:left-[50%] [&.active]:translate-x-[-50%] md:[&.active]:relative md:[&.active]:left-0 md:[&.active]:translate-x-0`}
    >

      {/* Boards */}
      <div className="flex flex-col gap-6">
        <p className="pl-6 text-body-xs text-text-muted">All Boards {`(${boards.length})`}</p>

        <ul className="flex flex-col gap-4">
          {boards.map((board) => (
            <li key={board.name}>
              <BoardListItem
                onClick={() => onToggleActiveBoard(board.name)}
                className={`${board.name === activeBoard.name && 'active'}`}
                tabIndex={isSidebarOpen ? 0 : -1}
              >
                {board.name}
              </BoardListItem>
            </li>
          ))}

          <li>
            <BoardListItem 
              tabIndex={isSidebarOpen ? 0 : -1}
              onClick={onAddNewBoard}
            >
              Create New Board
            </BoardListItem>
          </li>
        </ul>
      </div>

      <div className="relative md:flex md:flex-col md:gap-5">
        {/* Toggle Theme */}
        <div className="px-6">
          <div className="flex w-full items-center justify-center gap-4 rounded-md bg-background-secondary py-3 px-4">
            <LightThemeIcon />

            <div 
              className="pointer-events-auto h-fit w-fit rounded-full bg-primary-base p-1 xl:p-1.5">
              <input
                tabIndex={isSidebarOpen ? 0 : -1}
                id="toggle-checkbox"
                type="checkbox"
                value={activeTheme}
                onChange={toggleActiveTheme}
                checked={activeTheme === 'dark'}
                className="relative block h-6 min-h-full w-12 min-w-full cursor-pointer appearance-none rounded-full bg-primary-base
                before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-white before:shadow-md
                before:shadow-neutral-500 before:transition-transform before:duration-500 checked:before:translate-x-full"
              />

              <label htmlFor="toggle-checlbox" className="sr-only">
                toggle pricing card from monthly to annual
              </label>
            </div>

            <DarkThemeIcon />
          </div>
        </div>

        {/* Toggle Sidebar on tablet & desktop */}
        <div className="hidden items-center justify-center pr-6 md:flex">
          <button
            onClick={onToggleSidebar}
            className={`${sidebarState} relative left-[72%] flex items-center justify-center gap-4 rounded-tr-full rounded-br-full
            bg-primary-base px-5 py-3 text-text-muted transition-all hover:bg-btn-primary-hover [&.active]:static
            [&.active]:left-[unset] [&.active]:w-full [&.active]:bg-transparent [&.active]:hover:bg-btn-secondary
            `}
          >
            {isSidebarOpen ? <HideIcon /> : <ShowIcon />}            
            <span className={`${sidebarState} hidden text-xs [&.active]:inline-block`}>Hide Sidebar</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
