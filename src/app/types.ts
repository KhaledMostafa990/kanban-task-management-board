export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: { title: string; isCompleted: boolean }[];
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
