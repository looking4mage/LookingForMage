import { Context } from 'koa';

import { IAction } from '../../lib';
import { IHealthcheckResponse } from './types';

export async function getHealthcheck(_ctx: Context): Promise<IAction<IHealthcheckResponse>> {
  return { status: 200, body: { status: 'OK' } };
}
