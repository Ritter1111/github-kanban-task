import { useEffect } from 'react';
import { Row } from 'antd';
import Board from './Board/Board';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../store/slices/boardsSlice';
import { useGetReposIssuesQuery } from '../../store/api/api';
import { categorizeIssues } from '../../utils/filterByIssuesState';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getUpdatedBoard, setUpdatedBoard } from '../../utils/localStorage';
import Spinner from '../Spinner/Spinner';

export const Boards = () => {
  const apiUrl = useSelector((state: RootState) => state.search.url);
  const boards = useSelector((state: RootState) => state.boards.boards);
  const { data, isFetching } = useGetReposIssuesQuery(apiUrl);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = getUpdatedBoard(apiUrl);
    if (storedData) {
      dispatch(setBoards(storedData));
      return;
    }
    if (data) {
      const { todoIssues, inProgressIssues, doneIssues } =
        categorizeIssues(data);

      const updatedBoards = [
        { id: 1, title: 'To Do', issues: todoIssues },
        { id: 2, title: 'In Progress', issues: inProgressIssues },
        { id: 3, title: 'Done', issues: doneIssues },
      ];
      dispatch(setBoards(updatedBoards));
    }
  }, [apiUrl, data, dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

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

    dispatch(setBoards(updatedBoards));
    setUpdatedBoard(apiUrl, updatedBoards);
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
