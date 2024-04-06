// import { useState } from "react"
import { useGetReposIssuesQuery } from '../../store/api/api';

export const Boards = () => {
  const { data } = useGetReposIssuesQuery('Ritter1111/testsss');

  console.log(data);

  return <div>Boards</div>;
};
