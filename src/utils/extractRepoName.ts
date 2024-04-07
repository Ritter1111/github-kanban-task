import { BASE_GIT_URL } from './consts';

export const extractRepoName = (url: string) => {
  const urlArray = url.split(BASE_GIT_URL);
  return urlArray[urlArray.length - 1];
};
