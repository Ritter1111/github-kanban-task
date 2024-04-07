import { server } from '../../server';
import { render, screen, waitFor } from '@testing-library/react';
import { store } from '../../../store/store';
import { rest } from 'msw';
import { repoInfoMockData } from '../../mock_data';
import { RepoInfo } from '../../../components/RepoInfo/RepoInfo';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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

  it('renders data correctly', async () => {
    server.use(
      rest.get(
        'https://api.github.com/repos/Ritter1111/testsss',
        (_, res, ctx) => {
          return res(ctx.status(200), ctx.json(repoInfoMockData));
        }
      )
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RepoInfo />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const gitHubName = screen.getByText('facebook');
      const repoName = screen.getByText('react');
      const starsCount = screen.getByText('421k stars');

      expect(gitHubName).toHaveAttribute('href', 'https://github.com/facebook');

      expect(repoName).toHaveAttribute(
        'href',
        'https://github.com/facebook/react'
      );
      expect(starsCount).toBeInTheDocument();
    });
  });
});
