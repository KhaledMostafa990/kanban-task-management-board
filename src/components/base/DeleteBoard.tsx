import { DeleteView } from './DeleteView';

export function DeleteBoard({ board }: { board: any }) {
  if (!board) return null;
  return (
    <>
      <DeleteView type={'board'} board={board} title={board.name} />
    </>
  );
}
