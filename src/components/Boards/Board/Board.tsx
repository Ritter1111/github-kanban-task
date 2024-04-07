import { Card, Col } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import IssueList from '../IssueList/IssueList';
import { IIssueData } from '../../../types/types';

interface Board {
  id: number;
  title: string;
  issues: IIssueData[];
}

const Board: React.FC<Board> = ({ id, title, issues }) => {
  return (
    <Col span={8}>
      <Droppable droppableId={id.toString()}>
        {(provided) => (
          <Card
            title={title}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '70vh', backgroundColor: '#A9E3E5' }}
          >
            <IssueList issues={issues} />
            {provided.placeholder}
          </Card>
        )}
      </Droppable>
    </Col>
  );
};

export default Board;
