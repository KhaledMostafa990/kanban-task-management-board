import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { boards } from './data.json';
import { Board } from '../types';
import { boardFormInfo } from './CONSTANT';

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
  sidebarActive: boolean;
  boards: Board[];
  activeBoard: Board;
  theme: 'dark' | 'light';
  models: {
    open: boolean;
    modelView: string;
  };
  formInputs: FormInput[];
}

const boardState = {
  boards,
  activeBoard: boards[0],
  sidebarActive: false,
  theme: 'dark',
  models: {
    open: false,
    modelView: '',
  },
  formInputs: boardFormInfo,
} as BoardSidebarState;

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

    openBoardModel(state, actions: PayloadAction<string>) {
      state.models.open = !state.models.open;
      state.models.modelView = actions.payload;
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
        };
      }

      return {
        ...state,
        boards: [...state.boards, actions.payload],
      };
    },

    deleteBoard(state, actions: PayloadAction<string>) {
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== actions.payload),
      };
    },
  },
});

export default boardSidebar.reducer;
export const {
  toggleModelView,
  toggleSidebar,
  toggleActiveBoard,
  toggleTheme,
  openBoardModel,
  createNewBoard,
  deleteBoard,
} = boardSidebar.actions;
