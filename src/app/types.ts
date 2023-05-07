export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: { id: string; title: string; isCompleted: boolean }[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[] | [];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[] | [];
}

/*
<div className="flex flex-col gap-2.5">
<label className="text-body-xs font-bold text-text-base" htmlFor="task-title">
  Title
</label>

<input
  className="border border-border-input bg-transparent py-2 px-2.5 text-body-sm
    text-text-base placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25"
  type="text"
  name="title"
  id="task-title"
  value={defaultValues?.title || undefined}
  placeholder="e.g. Take coffe break"
/>
</div>

<div className="flex flex-col gap-2.5">
<label className="text-body-xs font-bold text-text-base" htmlFor="task-description">
  Description
</label>
<textarea
  className="h-24 border border-border-input bg-transparent py-2 px-2.5 text-body-sm
    text-text-base placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25"
  id="task-description"
  value={defaultValues?.description || undefined}
  placeholder="e.g. It’s always good to take a break. This 
    15 minute break will  recharge the batteries 
    a little."
  name="description"
  cols={30}
  rows={10}
/>
</div>

<div className="flex flex-col gap-2.5">
<label className="text-body-xs font-bold text-text-base" htmlFor="task-subtasks">
  Subtasks
</label>
{subtasks.map((el, idx) => (
  <div key={el} className="flex w-full items-center justify-center gap-4">
    <input
      className="w-full border border-border-input bg-transparent py-2 px-2.5 text-body-sm
      text-text-base placeholder:text-body-sm placeholder:text-text-base placeholder:opacity-25"
      type="text"
      name="subtasks"
      id="task-subtasks"
      value={defaultValues?.subtasks[idx].title || ''}
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
  Add New Subtask
</Button>
</div>

<div className="flex flex-col gap-2.5">
<label className="text-body-xs font-bold text-text-base" htmlFor="task-status">
  Status
</label>

<div className="relative">
  <svg
    className="absolute top-[50%] right-4 translate-y-[-50%]"
    width="10"
    height="7"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4" />
  </svg>

  <select
    className=" w-full appearance-none border border-border-input bg-transparent 
      py-2 px-2.5 text-body-sm text-text-base placeholder:text-body-sm placeholder:text-text-base
      placeholder:opacity-25"
    name="status"
    id="task-status"
    value={defaultValues?.status || ''}
    placeholder="e.g. Take coffe break"
  >
    <option
      className="appearance-none bg-background-primary py-2 px-2.5 text-text-muted"
      value="Todo"
      key=""
    >
      Todo
    </option>
    <option
      className="appearance-none bg-background-primary py-2 px-2.5 text-text-muted"
      value="Doing"
      key=""
    >
      Doing
    </option>
    <option
      className="appearance-none bg-background-primary py-2 px-2.5 text-text-muted"
      value="Done"
      key=""
    >
      Done
    </option>
  </select>
</div>
</div> 
*/
