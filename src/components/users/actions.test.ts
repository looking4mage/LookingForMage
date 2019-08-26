import { Context } from 'koa';

import * as u from './actions';
import { IListParameters, IListUsers, IUser } from './types';

describe('users actions', () => {
  it('should list all users', async () => {
    const ctx: {status?: number; body?: IListUsers, query: IListParameters} = { query: {} };

    await u.listUsers(ctx as Context);

    expect(ctx.status).toEqual(200);
    expect(ctx.body && ctx.body.data.length).toEqual(3);
    expect(ctx.body && ctx.body.data[1].guid).toEqual('2');
  });

  it('should list all users on page 2', async () => {
    const ctx: {status?: number; body?: IListUsers, query: IListParameters} = {
      query: {
        limit: '5',
        page: '2',
      },
    };

    await u.listUsers(ctx as Context);

    expect(ctx.status).toEqual(200);
    expect(ctx.body && ctx.body.data.length).toEqual(5);
    expect(ctx.body && ctx.body.data[2].guid).toEqual('8');
  });

  it('should create user', async () => {
    const ctx: {status?: number; body?: IUser} = {};

    await u.createUser(ctx as Context);

    expect(ctx.status).toEqual(201);
    expect(ctx.body && ctx.body.name).toEqual('Jeff Jefferson');
  });

  it('should get user', async () => {
    const ctx: {status?: number; body?: IUser; params?: {guid: string}} = {
      params: {
        guid: '1234',
      },
    };

    await u.getUser(ctx as Context);

    expect(ctx.status).toEqual(200);
    expect(ctx.body && ctx.body.guid).toEqual('1234');
  });

  it('should update user', async () => {
    const ctx: {status?: number; body?: IUser; params?: {guid: string}} = {
      params: {
        guid: '1234',
      },
    };

    await u.updateUser(ctx as Context);

    expect(ctx.status).toEqual(200);
    expect(ctx.body && ctx.body.guid).toEqual('1234');
  });

  it('should delete user', async () => {
    const ctx: {status?: number; body?: object} = {};

    await u.deleteUser(ctx as Context);

    expect(ctx.status).toEqual(200);
    expect(ctx.body).toBeUndefined();
  });
});
