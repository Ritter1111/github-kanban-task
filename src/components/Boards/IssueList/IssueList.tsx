import React from 'react';
import { IIssueData } from '../../../types/types';
import Issue from '../Issue/Issue';

interface IIssueList {
  issues: IIssueData[];
}

const IssueList: React.FC<IIssueList> = ({ issues }) => {
  return issues.map((issue, index) => (
    <Issue key={issue.id} issue={issue} index={index} />
  ));
};

export default IssueList;
