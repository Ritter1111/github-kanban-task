import { server } from '../../server';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { Boards } from '../../../components/Boards/Boards';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { responseData } from '../../mock_data';
import { setBoards } from '../../../store/slices/boardsSlice';

vi.mock('../../store/api/api');

describe('Boards component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('indicator loading', async () => {
    render(
      <Provider store={store}>
        <Boards />
      </Provider>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('no loading indicator when loading finished', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Boards />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
  });

  it('renders data correctly', async () => {
    server.use(
      rest.get(
        'https://api.github.com/repos/Ritter1111/testsss/issues',
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(responseData));
        }
      )
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Boards />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const todoBoardTitle = screen.getByText('To Do');
      const inProgressBoardTitle = screen.getByText('In Progress');
      const doneBoardTitle = screen.getByText('Done');
      const issueName = screen.getByText('Test');

      expect(issueName).toHaveAttribute(
        'href',
        'https://github.com/test/testsss/test'
      );
      expect(todoBoardTitle).toBeInTheDocument();
      expect(issueName).toBeInTheDocument();
      expect(inProgressBoardTitle).toBeInTheDocument();
      expect(doneBoardTitle).toBeInTheDocument();
    });
  });

  it('should dispatch setBoards with stored data when searchUrl changes', async () => {
    const storedBoardData = [
      { id: 1, title: 'To Do', issues: [] },
      { id: 2, title: 'In Progress', issues: [] },
      { id: 3, title: 'Done', issues: [] },
    ];

    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify(storedBoardData)
    );

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Boards />
          </BrowserRouter>
        </Provider>
      );
    });

    expect(dispatchSpy).toHaveBeenCalledWith(setBoards(storedBoardData));
  });
});
