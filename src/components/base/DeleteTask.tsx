import { DeleteView } from './DeleteView';
import { Task } from '../../app/types';

export function DeleteTask({ task }: { task: Task; columns: any[] }) {
  return (
    <>
      <DeleteView type={'task'} title={task.title} />
    </>
  );
}
