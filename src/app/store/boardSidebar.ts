import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { boards } from './data.json';
import { Board } from "../types";

export interface BoardSidebarState {
  sidebarActive: boolean;
  boards: Board[];
  activeBoard: Board;
  theme: 'dark' | 'light';
  models: {
    open: boolean;
    modelView: string;
  }
}

const boardSidebarState = {
  boards,
  activeBoard: boards[0],
  sidebarActive: false,
  theme: 'dark',
  models: {
    open: false,
    modelView: '', 
  }
} as BoardSidebarState;

const boardSidebar = createSlice({
  name:'toggleSidebar',
  initialState: boardSidebarState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarActive = !state.sidebarActive;
    },

    toggleActiveBoard(state, actions: PayloadAction<string>) {    
      state.activeBoard = state.boards.filter((board: Board) => board.name === actions.payload)[0];
    },

    toggleTheme(state, actions: PayloadAction<'dark' | 'light'>) {
      state.theme = actions.payload;  
      const appContainer = document.body.firstElementChild;

      if(state.theme === 'dark') {
        appContainer?.classList.add(`${state.theme}-theme`);
      } else {
        appContainer?.classList.remove(`dark-theme`);        
      }
    },

    createNewBoard(state) {
      state.models.open = !state.models.open;
      state.models.modelView = 'createBoard';
    },

    toggleModelView (state) {
      state.models.open = !state.models.open;
    }
    
  }
});

export const { toggleModelView, toggleSidebar, toggleActiveBoard, toggleTheme, createNewBoard } = boardSidebar.actions;
export default boardSidebar.reducer;
