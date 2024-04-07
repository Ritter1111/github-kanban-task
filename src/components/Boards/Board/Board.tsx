import { Card, Col } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import IssueList from '../IssueList/IssueList';
import { IIssueData } from '../../../types/types';

interface IBoardProps {
  id: number;
  title: string;
  issues: IIssueData[];
}

const Board: React.FC<IBoardProps> = ({ id, title, issues }) => {
  return (
    <Col span={8}>
      <Droppable droppableId={id.toString()}>
        {(provided) => (
          <Card
            title={title}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              height: '70vh',
              backgroundColor: '#A9E3E5',
              overflowY: 'auto',
            }}
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
