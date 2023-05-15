'use client';

import { useAppSelector, useAppDispatch, openBoardModal, setActiveTask } from '@/app/store';
import { ActiveBoardView, BoardColumn, EmptyBoardView, NoBoardsView } from '@/components/board';
import { TaskCard } from '@/components/task';

export default function Board() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector((state) => state.boardSidebar.activeBoard);
  const onAddColumnClick = () => dispatch(openBoardModal('editBoard'));
  const onAddNewBoardClick = () => dispatch(openBoardModal('createBoard'));

  const onOpenTask = (taskId: string, colId: string) => {
    dispatch(setActiveTask({ colId, taskId }));
    dispatch(openBoardModal('viewTask'));
  };

  if (!activeBoard) return <NoBoardsView onAddNewBoardClick={onAddNewBoardClick} />;

  const boardColumnsLength = activeBoard.columns.length;

  if (boardColumnsLength === 0) return <EmptyBoardView onAddColumnClick={onAddColumnClick} />;

  return (
    <ActiveBoardView onAddColumnClick={onAddColumnClick}>
      {activeBoard.columns.map((column: any) => (
        <BoardColumn key={column.id} index={column.id} tasksLength={column.tasks.length} columnName={column.name}>
          {column.tasks.map((task: any) => (
            <TaskCard key={task.id} task={task} onClick={() => onOpenTask(task.id, column.id)} />
          ))}
        </BoardColumn>
      ))}
    </ActiveBoardView>
  );
}
