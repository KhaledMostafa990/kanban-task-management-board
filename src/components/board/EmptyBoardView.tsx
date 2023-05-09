'use client';

import { Button } from '@/components/base';

export function EmptyBoardView({ onAddColumnClick }: { onAddColumnClick: any; }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h2 className="text-center text-lg font-bold text-text-muted">
        This board is empty. Create a new column to get started.
      </h2>
      <Button type="primary" withIcon
        onClick={onAddColumnClick}
      >
        Add New Column
      </Button>
    </div>
  );
}
