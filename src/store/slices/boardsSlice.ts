import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardData } from '../../types/types';

interface IBoardsState {
  boards: IBoardData[];
}

const initialState: IBoardsState = {
  boards: [
    { id: 1, title: 'To Do', issues: [] },
    { id: 2, title: 'In Progress', issues: [] },
    { id: 3, title: 'Done', issues: [] },
  ],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<IBoardData[]>) {
      state.boards = action.payload;
    },
  },
});

export const { setBoards } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
