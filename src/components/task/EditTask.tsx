import { Task } from '@/app/types';
import { TaskForm } from './TaskForm';

export function EditTask({ task, columns }: { task: Task | null; columns: any[] }) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">Edit Task</h2>
      <TaskForm defaultValues={task} columns={columns} />
    </>
  );
}
