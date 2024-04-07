export const parseGitAndRepoNames = (fullName: string) => {
  const gitPathArray = fullName.split('/');
  const gitName = gitPathArray[0];
  const repoName = gitPathArray[1];

  return { gitName, repoName, fullName };
};
