import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, Task } from '@/app/types';
import data from './data.json';
import { boardFormInfo } from './CONSTANT';

const { boards } = data;
export interface FormInput {
  label?: string;
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  required?: boolean;
  inputs?: FormInput[];
}

export interface BoardSidebarState {
  boards: Board[];
  activeBoard: Board;
  activeTask: Task | null;
  sidebarActive: boolean;
  theme: 'dark' | 'light';
  models: {
    open: boolean;
    modelView: string;
  };
  formInputs: FormInput[];
}

const boardState: BoardSidebarState = {
  boards,
  activeBoard: boards[0],
  sidebarActive: false,
  theme: 'dark',
  models: {
    open: false,
    modelView: '',
  },
  formInputs: boardFormInfo,
  activeTask: null,
};

const boardSidebar = createSlice({
  name: 'toggleSidebar',
  initialState: boardState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarActive = !state.sidebarActive;
    },

    toggleActiveBoard(state, actions: PayloadAction<string | null>) {
      [state.activeBoard] = state.boards.filter((board: Board) => board.name === actions.payload);
      return state;
    },

    toggleTheme(state, actions: PayloadAction<'dark' | 'light'>) {
      state.theme = actions.payload;
      const appContainer = document.body.firstElementChild;

      if (state.theme === 'dark') {
        appContainer?.classList.add(`${state.theme}-theme`);
      } else {
        appContainer?.classList.remove(`dark-theme`);
      }
    },

    toggleModelView(state) {
      state.models.open = !state.models.open;
    },

    openBoardModal(state, actions: PayloadAction<string>) {
      state.models.modelView = actions.payload;
      state.models.open = true;

      return state;
    },

    createNewBoard(state, actions: PayloadAction<Board>) {
      const exsitingBoard = state.boards.find((board) => board.id === actions.payload.id);
      if (exsitingBoard) {
        return {
          ...state,
          boards: state.boards.map((board) => {
            if (board.id === actions.payload.id) {
              return actions.payload;
            }
            return board;
          }),
          activeBoard: actions.payload,
        };
      }

      return {
        ...state,
        boards: [...state.boards, actions.payload],
        activeBoard: actions.payload,
      };
    },

    deleteBoardOrTask(
      state,
      actions: PayloadAction<{ type: string; id: string; taskStatus: string }>,
    ) {
      if (actions.payload.type === 'board') {
        const { boards } = state;

        const boardIndex = boards.findIndex((b) => b.id === actions.payload.id);
        const prvBoard = boardIndex - 1;
        const nextBoard = boardIndex + 1;

        if (boards[nextBoard] != null) {
          state.activeBoard = boards[nextBoard];
        } else if (boards[prvBoard] != null) {
          state.activeBoard = boards[prvBoard];
        } else state.activeBoard = null!;

        state.boards = boards.filter((board) => board.id !== actions.payload.id);
      } else {
        const newColumns = state.activeBoard.columns.map((col) => {
          if (actions.payload.taskStatus !== '' && col.name === actions.payload.taskStatus) {
            return {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== actions.payload.id),
            };
          }
          return col;
        });

        return {
          ...state,
          boards: state.boards.map((board) => {
            if (board.id === state.activeBoard.id) {
              return {
                ...state.activeBoard,
                columns: newColumns,
              };
            }
            return board;
          }),
          activeBoard: {
            ...state.activeBoard,
            columns: newColumns,
          },
        };
      }
      return state;
    },

    setActiveTask(state, actions: PayloadAction<{ colId: string; taskId: string }>) {
      const activeTask = state.activeBoard.columns
        .filter((col) => col.id === actions.payload.colId)[0]
        .tasks.find((task) => task.id === actions.payload.taskId);

      if (activeTask) state.activeTask = activeTask;
    },

    saveTask(state, actions: PayloadAction<{ task: Task }>) {
      const { activeTask } = state;
      if (activeTask && activeTask.id === actions.payload.task.id) {
        console.log(activeTask, activeTask?.id);
        const previowsStatus = activeTask.status;
        const statusChanged = previowsStatus !== actions.payload.task.status;

        activeTask.title = actions.payload.task.title;
        activeTask.description = actions.payload.task.description;
        activeTask.subtasks = actions.payload.task.subtasks;
        activeTask.status = actions.payload.task.status;

        const newColumns = state.activeBoard.columns.map((col) => {
          if (statusChanged && col.name === previowsStatus) {
            col.tasks = col.tasks.filter((task) => task.id !== actions.payload.task.id);
          }

          if (statusChanged && col.name === actions.payload.task.status) {
            activeTask.id = `${new Date().toISOString()}-${col.tasks.length + 1}`;
            return { ...col, tasks: [...col.tasks, activeTask] };
          }
          if (col.name === actions.payload.task.status) {
            return {
              ...col,
              tasks: col.tasks.map((task) => {
                if (task.id === actions.payload.task.id) {
                  return activeTask;
                }
                return task;
              }),
            };
          }
          return col;
        });

        state.boards = state.boards.map((board) => {
          if (board.id === state.activeBoard.id) {
            return {
              ...state.activeBoard,
              columns: newColumns,
            };
          }

          return board;
        });
      } else {
        const newTask = actions.payload.task;
        state.boards = state.boards.map((board) => {
          if (board.id === state.activeBoard.id) {
            return {
              ...state.activeBoard,
              columns: state.activeBoard.columns.map((col) => {
                if (col.name === newTask.status) {
                  return {
                    ...col,
                    tasks: [...col.tasks, newTask],
                  };
                }
                return col;
              }),
            };
          }
          return board;
        });
      }

      state.activeBoard = state.boards.filter((board) => board.id === state.activeBoard.id)[0];

    },

    toggleSubTaskStatus(
      state,
      actions: PayloadAction<{ colId: string; taskId: string; subtaskId: string }>,
    ) {
      const activeTask = state.activeBoard.columns
        .filter((col) => col.id === actions.payload.colId)[0]
        .tasks.find((task) => task.id === actions.payload.taskId);

      if (activeTask) {
        const subtask = activeTask.subtasks.find(
          (subtask) => subtask.id === actions.payload.subtaskId,
        );
        if (subtask) subtask.isCompleted = !subtask.isCompleted;
        state.activeTask = activeTask;

        state.boards = state.boards.map((board) => {
          if (board.id === state.activeBoard.id) {
            return {
              ...state.activeBoard,
              columns: state.activeBoard.columns.map((col) => {
                if (col.id === actions.payload.colId) {
                  return {
                    ...col,
                    tasks: col.tasks.map((task) => {
                      if (task.id === actions.payload.taskId) return activeTask;
                      return task;
                    }),
                  };
                }
                return col;
              }),
            };
          }
          return board;
        });
      }
    },

    toggleTaskStatus(
      state,
      actions: PayloadAction<{ currentCol: string; nextCol: string; taskId: string }>,
    ) {
      const currentBoard = state.activeBoard;
      const { activeTask } = state;

      const currentColumn = currentBoard.columns.filter(
        (col) => col.id === actions.payload.currentCol,
      )[0];

      const nextColumn = currentBoard.columns.filter(
        (col) => col.id === actions.payload.nextCol,
      )[0];

      if (activeTask && currentColumn && nextColumn) {
        currentColumn.tasks = currentColumn.tasks.filter(
          (task) => task.id !== actions.payload.taskId,
        );

        activeTask.status = nextColumn.name;
        activeTask.id = `${nextColumn.tasks.length + 1}-${activeTask?.title.slice(0, 3)}`;

        if (nextColumn.tasks.length > 0) {
          nextColumn.tasks = [...nextColumn.tasks, activeTask];
        } else nextColumn.tasks = [activeTask];

        state.boards = state.boards.map((board) => {
          if (board.id === currentBoard.id) {
            return {
              ...board,
              columns: board.columns.map((col) => {
                if (col.id === actions.payload.currentCol) return currentColumn;
                if (col.id === actions.payload.nextCol) return nextColumn;
                return col;
              }),
            };
          }
          return board;
        });
        state.activeTask = activeTask;
      }
    },
  },
});

export const boardReducer = boardSidebar.reducer;
export const {
  toggleModelView,
  toggleSidebar,
  toggleActiveBoard,
  toggleTheme,
  openBoardModal,
  createNewBoard,
  deleteBoardOrTask,
  setActiveTask,
  toggleSubTaskStatus,
  toggleTaskStatus,
  saveTask,
} = boardSidebar.actions;
