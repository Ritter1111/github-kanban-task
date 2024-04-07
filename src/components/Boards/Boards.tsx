import { useCallback, useEffect } from 'react';
import { Flex, Row } from 'antd';
import Board from './Board/Board';
import Spinner from '../Spinner/Spinner';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../../store/slices/boardsSlice';
import { useGetReposIssuesQuery } from '../../store/api/api';
import { categorizeIssues } from '../../utils/filterByIssuesState';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getUpdatedBoard, saveUpdatedBoard } from '../../utils/localStorage';
import { toast } from 'react-toastify';

export const Boards = () => {
  const searchUrl = useSelector((state: RootState) => state.search.url);
  const boards = useSelector((state: RootState) => state.boards.boards);
  const { data, isFetching, error } = useGetReposIssuesQuery(searchUrl);
  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination) {
        return;
      }

      const sourceBoardId = parseInt(source.droppableId, 10);
      const destinationBoardId = parseInt(destination.droppableId, 10);

      const updatedBoards = boards.map((board) => ({
        ...board,
        issues: [...board.issues],
      }));

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
      saveUpdatedBoard(searchUrl, updatedBoards);
    },
    [boards, dispatch, searchUrl]
  );

  useEffect(() => {
    const storedBoard = getUpdatedBoard(searchUrl);

    if (storedBoard) {
      dispatch(setBoards(JSON.parse(storedBoard)));
      return;
    }

    if (data) {
      const { todoIssues, inProgressIssues, doneIssues } =
        categorizeIssues(data);

      const filteredBoards = [
        { id: 1, title: 'To Do', issues: todoIssues },
        { id: 2, title: 'In Progress', issues: inProgressIssues },
        { id: 3, title: 'Done', issues: doneIssues },
      ];

      dispatch(setBoards(filteredBoards));
    }
  }, [searchUrl, data, dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

  if (error) {
    if ('status' in error && (error.status === 403 || error.status === 404)) {
      toast.error(
        'Incorrect github url! Try like this https://github.com/facebook/react'
      );

      return (
        <Flex style={{ padding: '20px', justifyContent: 'center' }}>
          Unable to fetch issues. Please check the URL and try again.
        </Flex>
      );
    }
  }

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
