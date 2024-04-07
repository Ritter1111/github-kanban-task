import { IBoardData } from '../types/types';

export const getUpdatedBoard = (key: string) => {
  const updatedBoard = localStorage.getItem(key) ?? '';
  return updatedBoard;
};

export const saveUpdatedBoard = (key: string, value: IBoardData[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
