import { Context } from 'koa';
import pg from 'pg';

import { postgres } from './postgres';

describe('postgres', () => {
  let ctx: {
    status?: number;
    db?: any,
  };

  beforeEach(() => { ctx = {}; });

  it('should correctly setup database connection', async () => {
    class MyClient extends pg.Pool {
      public connect = jest.fn();
      public end = jest.fn();
    }
    pg.Pool = MyClient;

    await postgres(ctx as Context, async () => { ctx.status = 200; });

    expect(ctx.db).toBeDefined();
    expect(ctx.db).toHaveProperty('query');
    expect(ctx.status).toBe(200);
  });
});
