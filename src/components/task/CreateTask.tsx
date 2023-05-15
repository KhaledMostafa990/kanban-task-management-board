import { Column } from '@/app/types';
import { TaskForm } from './TaskForm';

export function CreateTask({ columns }: { columns: Column[] }) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">Add New Task</h2>
      <TaskForm columns={columns} />
    </>
  );
}
