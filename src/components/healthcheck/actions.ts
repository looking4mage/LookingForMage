import { Context } from 'koa';

import { IHealthcheckResponse } from './types';

export async function getHealthcheck(ctx: Context) {
  const body: IHealthcheckResponse = { status: 'OK' };

  ctx.status = 200;
  ctx.body = body;
}
