import { useState } from 'react';
import { Button } from './Button';
import { Board } from '../../app/types';

export function BoardForm({ defaultValues }: { defaultValues?: Board }) {
  const [subtasks] = useState(
    defaultValues ? defaultValues.columns.map((col) => col.name) : ['Todo', 'Doing'],
  );

  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-2.5">
        <label className="text-body--xs font-bold text-text-base" htmlFor="task-title">
          Board Name
        </label>

        <input
          className="border border-border-input bg-transparent py-2 px-2.5 text-body-sm
            text-text-base placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25"
          type="text"
          name="title"
          id="task-title"
          value={defaultValues?.name || undefined}
          placeholder="e.g. Web Design"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-body--xs font-bold text-text-base" htmlFor="task-subtasks">
          Board Columns
        </label>

        {subtasks.map((el, idx) => (
          <div key={el} className="flex w-full items-center justify-center gap-4">
            <input
              className="w-full border border-border-input bg-transparent py-2 px-2.5 text-body-sm
              text-text-base placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25"
              type="text"
              name="subtasks"
              id="task-subtasks"
              value={defaultValues?.columns[idx].name || ''}
              placeholder={el}
            />
            <div className="w-fit cursor-pointer">
              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fill-rule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </div>
          </div>
        ))}

        <Button type="secondary" withIcon iconSmall>
          Add New Column
        </Button>
      </div>

      <Button submitBtn type="primary">
        {defaultValues ? 'Save Board' : 'Create New Board'}
      </Button>
    </form>
  );
}
