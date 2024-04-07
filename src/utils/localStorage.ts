import { IBoardData } from '../types/types';

export const getUpdatedBoard = (key: string) => {
  const updatedBoard = localStorage.getItem(key) ?? '';
  return JSON.parse(updatedBoard);
};

export const setUpdatedBoard = (key: string, value: IBoardData[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
