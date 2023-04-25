import { DeleteView } from './DeleteView';
import { Task } from './types';

export function DeleteTask({ task }: { task: Task; columns: any[] }) {
  return (
    <>
      <DeleteView type={'task'} title={task.title} />
    </>
  );
}
