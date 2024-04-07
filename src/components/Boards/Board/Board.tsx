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
      <Card
        title={title}
        className="custom-scrollbar"
        style={{
          height: '70vh',
          backgroundColor: '#f0ece2',
          overflowY: issues.length > 1 ? 'scroll' : undefined,
        }}
      >
        <Droppable droppableId={id.toString()}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <IssueList issues={issues} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </Col>
  );
};

export default Board;
