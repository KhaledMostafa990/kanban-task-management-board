export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
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
