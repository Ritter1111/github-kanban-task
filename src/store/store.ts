import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { githubApi } from './api/api';
import { searchReducer } from './slices/searchSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  [githubApi.reducerPath]: githubApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
