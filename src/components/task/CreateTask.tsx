import { Column } from '@/app/types';
import { TaskForm } from './TaskForm';

export function CreateTask({columns , boardName} : {columns: Column[], boardName: string}) {
  return (
    <>
      <h2 className="text-lg font-bold text-text-base">Add New Task</h2>
      <TaskForm columns={columns} boardName={boardName} />
    </>
  );
}
