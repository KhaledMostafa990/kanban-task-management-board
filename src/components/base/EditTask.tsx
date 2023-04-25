import { TaskForm } from './TaskForm';
import { Task } from './types';

export function EditTask({ task }: { task: Task; columns: any[] }) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">Edit Task</h2>
      <TaskForm defaultValues={task} />
    </>
  );
}
