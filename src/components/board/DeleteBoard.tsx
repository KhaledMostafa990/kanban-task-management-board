import { DeleteView } from '@/components/shared';

export function DeleteBoard({ board }: { board: any }) {
  if (!board) return null;
  return (
    <>
      <DeleteView type={'board'} data={board} title={board.name} />
    </>
  );
}
