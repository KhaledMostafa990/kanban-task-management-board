import { DeleteView } from './DeleteView';

export function DeleteBoard({ board }: { board: any; columns: any[] }) {
  return (
    <>
      <DeleteView type={'board'} title={board.name} />
    </>
  );
}
