import { Draggable } from 'react-beautiful-dnd';
import { Card, Row } from 'antd';
import { IIssueData } from '../../../types/types';
import { Link } from 'react-router-dom';
import { daysUnlitNow } from '../../../utils/parseData';

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
          <Card size="small" style={{ maxWidth: '330px' }}>
            <Link to={issue.html_url}>{issue.title}</Link>
            <Row style={{ margin: '10px 0' }}>
              #{issue.number} {daysUnlitNow(issue.created_at)}
            </Row>

            <Row style={{ margin: '10px 0' }}>
              {issue.author_association} | Comments: {issue.comments}
            </Row>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Issue;
