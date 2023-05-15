import { Board } from '@/app/types';
import { BoardForm } from './BoardForm';

export function EditBoard({ board }: { board: Board }) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">Edit Board</h2>
      <BoardForm defaultValues={board} />
    </>
  );
}
