import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { boards } from './data.json';
import { Board } from '../types';

export interface BoardSidebarState {
  sidebarActive: boolean;
  boards: Board[];
  activeBoard: Board;
  theme: 'dark' | 'light';
  models: {
    open: boolean;
    modelView: string;
  };
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
} as BoardSidebarState;

const boardSidebar = createSlice({
  name: 'toggleSidebar',
  initialState: boardState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarActive = !state.sidebarActive;
    },

    toggleActiveBoard(state, actions: PayloadAction<string>) {
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
      console.log(actions.payload)
      state.models.modelView = actions.payload;
    },

    createNewBoard(state, actions: PayloadAction<Board>) {
      if(state.boards.find(board => board.name === actions.payload.name)) {
        return {
          ...state,
          boards: [
            ...state.boards.filter(b => b.name !== actions.payload.name)
            .concat(actions.payload)
          ]
        }
      } else {
        return {
          ...state,
          boards: [...state.boards, actions.payload],
        };
      }
    },

    // editBoard(state, actions: PayloadAction<Board>) {
    //   return {
    //     ...state,
    //     boards: [...state.boards, ],
    //   };
    // },
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
} = boardSidebar.actions;
