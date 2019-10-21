import { Context } from 'koa';

import { getHealthcheck } from './actions';

describe('healthcheck actions', () => {
  it('should respond with status OK', async () => {
    const response = await getHealthcheck(new Object() as Context);

    expect(response.status).toEqual(200);
    expect(response.body && response.body.status).toEqual('OK');
  });
});
