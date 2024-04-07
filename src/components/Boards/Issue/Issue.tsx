import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import { IIssueData } from '../../../types/types';

interface IIssueList {
  issue: IIssueData;
  index: number;
}

const Issue: React.FC<IIssueList> = ({ issue, index }) => {
  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card size="small">
            <p>{issue.title}</p>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Issue;
