import { useEffect, useState } from 'react';
import { useGetReposIssuesQuery } from '../../store/api/api';
import { categorizeIssues } from '../../utils/filterByIssuesState';
import { IIssueData } from '../../types/types';
import { Card, Row, Col } from 'antd';

interface IBoard {
  id: number;
  title: string;
  issues: IIssueData[];
}

export const Boards = () => {
  const { data } = useGetReposIssuesQuery('Ritter1111/testsss');
  const [boards, setBoards] = useState<IBoard[]>([
    { id: 1, title: 'To Do', issues: [] },
    { id: 2, title: 'In Progress', issues: [] },
    { id: 3, title: 'Done', issues: [] },
  ]);

  useEffect(() => {
    if (data) {
      const { todoIssues, inProgressIssues, doneIssues } =
        categorizeIssues(data);
      setBoards([
        { id: 1, title: 'To Do', issues: todoIssues },
        { id: 2, title: 'In Progress', issues: inProgressIssues },
        { id: 3, title: 'Done', issues: doneIssues },
      ]);
    }
  }, [data]);

  return (
    <Row gutter={[16, 16]}>
      {boards.map((board) => (
        <Col span={8} key={board.id}>
          <Card title={board.title} style={{}}>
            {board.issues.map((issue) => (
              <Card
                key={issue.id}
                size="small"
                style={{ margin: '10px 0' }}
                draggable
              >
                <p>{issue.title}</p>
              </Card>
            ))}
          </Card>
        </Col>
      ))}
    </Row>
  );
};
