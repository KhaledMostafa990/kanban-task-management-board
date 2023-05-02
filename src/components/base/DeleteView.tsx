import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteBoard, toggleActiveBoard, toggleModelView } from '@/app/store/boardSlice';
import { Board } from '@/app/types';
import { Button } from './Button';

export function DeleteView({ type, title, board }: { type: string; title: string; board: Board }) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boardSidebar.boards);

  const onDeleteBoard = () => {
    // get previous and next board index to set the new active board
    const boardIndex = boards.findIndex((b) => b.id === board.id);
    const prvBoard = boardIndex - 1;
    const nextBoard = boardIndex + 1;

    console.log(boards, boardIndex, boards[nextBoard]);

    if (boards[nextBoard] != null) {
      dispatch(toggleActiveBoard(boards[nextBoard].name));
    } else if (boards[prvBoard] != null) {
      dispatch(toggleActiveBoard(boards[prvBoard].name));
    } else {
      dispatch(toggleActiveBoard(''));
    }

    dispatch(deleteBoard(`${board.id}`));
    dispatch(toggleModelView());
  };

  return (
    <>
      <h2 className="text-lg font-bold text-secondary-base">Delete this {type}</h2>

      <p className="text-text-muted">
        Are you sure you want to delete the {title} {type}? This action will remove all columns and
        tasks and cannot be reversed.
      </p>

      <div className="flex flex-col gap-3">
        <Button type="danger" onClick={onDeleteBoard}>
          Delete
        </Button>
        <Button type="secondary" onClick={() => dispatch(toggleModelView())}>
          Cancel
        </Button>
      </div>
    </>
  );
}
