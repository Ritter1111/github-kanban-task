import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { repoInfoMockData, responseData } from './mock_data';

global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const server = setupServer(
  rest.get(
    'https://api.github.com/repos/Ritter1111/testsss/issues',
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(responseData));
    }
  ),
  rest.get('https://api.github.com/repos/Ritter1111/testsss', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(repoInfoMockData));
  })
);

export { server };
