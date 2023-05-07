import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { deleteBoardOrTask, toggleActiveBoard, toggleModelView } from '@/app/store/boardSlice';
import { Board, Task } from '@/app/types';
import { Button } from './Button';

export function DeleteView({
  type,
  title,
  data,
}: {
  type: string;
  title: string | undefined;
  data: Board | Task | null;
}) {
  const dispatch = useAppDispatch();
  
  const onDeleteBoardOrdeleteBoardOrTask = () => {
    let statusName = '';

    if (data && 'status' in data) {
       statusName = data.status;
    }
    
    dispatch(deleteBoardOrTask({
      type: type,
      id: data != null ? data.id : '',
      taskStatus: statusName,
    }));

    dispatch(toggleModelView());
  };

  return (
    <>
      <h2 className="text-lg font-bold text-secondary-base">Delete this {type}</h2>

      <p className="text-text-muted">
        Are you sure you want to delete the {title} {type}? This action will remove all columns and
        tasks and cannot be reversed.
      </p>

      <div className="flex flex-col gap-3">
        <Button type="danger" onClick={onDeleteBoardOrdeleteBoardOrTask}>
          Delete
        </Button>
        <Button type="secondary" onClick={() => dispatch(toggleModelView())}>
          Cancel
        </Button>
      </div>
    </>
  );
}
