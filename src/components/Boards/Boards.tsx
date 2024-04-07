import { useEffect, useState } from 'react';
import { useGetReposIssuesQuery } from '../../store/api/api';
import { categorizeIssues } from '../../utils/filterByIssuesState';
import { IIssueData } from '../../types/types';
import { Row } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Board from './Board/Board';

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

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const sourceBoardId = parseInt(source.droppableId);
    const destinationBoardId = parseInt(destination.droppableId);
    const updatedBoards = [...boards];
    const [movedIssue] = updatedBoards[sourceBoardId - 1].issues.splice(
      source.index,
      1
    );
    updatedBoards[destinationBoardId - 1].issues.splice(
      destination.index,
      0,
      movedIssue
    );
    setBoards(updatedBoards);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row gutter={[16, 16]}>
        {boards.map((board) => (
          <Board key={board.id} {...board} />
        ))}
      </Row>
    </DragDropContext>
  );
};
