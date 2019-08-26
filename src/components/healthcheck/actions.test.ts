import { Context } from 'koa';

import { getHealthcheck } from './actions';
import { IHealthcheckResponse } from './types';

describe('healthcheck actions', () => {
  it('should respond with status OK', async () => {
    const ctx: { status?: number; body?: IHealthcheckResponse } = {};

    await getHealthcheck(ctx as Context);

    expect(ctx.status).toEqual(200);
    expect(ctx.body).toHaveProperty('status');
    expect(ctx.body && ctx.body.status).toEqual('OK');
  });
});
