import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/consts';
import { IIssueData, IRepoInfo } from '../../types/types';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getReposIssues: builder.query<IIssueData[], string>({
      query: (repoName) => ({
        url: `/${repoName}/issues?state=all`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    getReposInfo: builder.query<IRepoInfo, string>({
      query: (repoName) => ({
        url: `/${repoName}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetReposIssuesQuery, useGetReposInfoQuery } = githubApi;
