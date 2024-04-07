import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Schema = {
  url: string;
};

const initialState: Schema = {
  url: 'Ritter1111/testsss',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setSearchUrl } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
