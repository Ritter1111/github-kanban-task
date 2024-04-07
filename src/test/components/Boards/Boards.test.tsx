import { server } from '../../server';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { Boards } from '../../../components/Boards/Boards';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { responseData } from '../../mock_data';

describe('Details component', () => {
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
});
