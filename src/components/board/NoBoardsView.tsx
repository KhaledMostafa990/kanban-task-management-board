'use client';
import { Button } from '@/components/base';

export function NoBoardsView({ onAddNewBoardClick }: { onAddNewBoardClick: any; }): JSX.Element {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-lg font-bold text-text-muted">
        There is no board here yet. Create a new board to get started.
      </h2>
      <Button type="primary" withIcon
        onClick={onAddNewBoardClick}>
        Add New Board
      </Button>
    </div>
  );
}
