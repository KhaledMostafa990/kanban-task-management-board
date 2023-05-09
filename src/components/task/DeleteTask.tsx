import { DeleteView } from '@/components/shared';
import { Column, Task } from '@/app/types';

export function DeleteTask({ task }: { task: Task | null; columns: Column[] }) {
  return (
    <>
      <DeleteView type={'task'} data={task} title={task?.title} />
    </>
  );
}
