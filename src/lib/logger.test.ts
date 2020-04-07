import { Context } from 'koa';

import { logger, setupLogger } from './logger';

describe('logger', () => {
  let ctx: {
    status?: number;
    log?: any,
  };

  beforeEach(() => { ctx = {}; });

  it('should correctly setup logger', async () => {
    const log = setupLogger();
    await logger(log)(ctx as Context, async () => { ctx.status = 200; });

    expect(ctx.log).toBeDefined();
    expect(ctx.log).toHaveProperty('debug');
    expect(ctx.log).toHaveProperty('info');
    expect(ctx.log).toHaveProperty('warn');
    expect(ctx.log).toHaveProperty('error');
    expect(ctx.status).toBe(200);
  });

  it('should correctly setup logger with DEBUG env variable', async () => {
    process.env.DEBUG = 'true';
    const log = setupLogger();
    await logger(log)(ctx as Context, async () => { ctx.status = 200; });

    expect(ctx.log).toBeDefined();
    expect(ctx.log).toHaveProperty('debug');
    expect(ctx.log).toHaveProperty('info');
    expect(ctx.log).toHaveProperty('warn');
    expect(ctx.log).toHaveProperty('error');
    expect(ctx.status).toBe(200);
  });
});
