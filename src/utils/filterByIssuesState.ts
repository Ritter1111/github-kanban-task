import { IIssueData } from '../types/types';

export const categorizeIssues = (issues: IIssueData[]) => {
  return {
    todoIssues: issues.filter(
      (issue) => issue.state === 'open' && issue.assignees!.length === 0
    ),
    inProgressIssues: issues.filter(
      (issue) => issue.state === 'open' && issue.assignees!.length > 0
    ),
    doneIssues: issues.filter((issue) => issue.state === 'closed'),
  };
};
