import { TaskForm } from './TaskForm';
import { Task } from '@/app/types';

export function EditTask({ task, columns, boardName } : { task: Task | null; columns: any[], boardName: string }) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">Edit Task</h2>
      <TaskForm defaultValues={task} columns={columns} boardName={boardName} />
    </>
  );
}
