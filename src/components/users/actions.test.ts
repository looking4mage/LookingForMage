import { Context } from 'koa';

import * as u from './actions';
import { IListParameters } from './types';

describe('users actions', () => {
  it('should list all users', async () => {
    const ctx: {query: IListParameters} = { query: {} };

    const response = await u.listUsers(ctx as Context);

    expect(response.status).toEqual(200);
    expect(response.body && response.body.data.length).toEqual(3);
    expect(response.body && response.body.data[1].guid).toEqual('2');
  });

  it('should list all users on page 2', async () => {
    const ctx: {query: IListParameters} = {
      query: {
        limit: 5,
        page: 2,
      },
    };

    const response = await u.listUsers(ctx as Context);

    expect(response.status).toEqual(200);
    expect(response.body && response.body.data.length).toEqual(5);
    expect(response.body && response.body.data[2].guid).toEqual('8');
  });

  it('should create user', async () => {
    const response = await u.createUser(new Object() as Context);

    expect(response.status).toEqual(201);
    expect(response.body && response.body.name).toEqual('Jeff Jefferson');
  });

  it('should fail to get user due to not found', async () => {
    const ctx: { params?: { guid: string } } = {
      params: {
        guid: 'not-found',
      },
    };
    await expect(u.getUser(ctx as Context)).rejects.toThrowError(/User not found/);
  });

  it('should get user', async () => {
    const ctx: { params?: { guid: string } } = {
      params: {
        guid: '1234',
      },
    };

    const response = await u.getUser(ctx as Context);

    expect(response.status).toEqual(200);
    expect(response.body && response.body.guid).toEqual('1234');
  });

  it('should fail to update user due to validation error', async () => {
    const ctx: { params?: { guid: string } } = {
      params: {
        guid: 'validation-error',
      },
    };

    await expect(u.updateUser(ctx as Context)).rejects.toThrowError(/Invalid payload provided/);
  });

  it('should update user', async () => {
    const ctx: { params?: { guid: string } } = {
      params: {
        guid: '1234',
      },
    };

    const response = await u.updateUser(ctx as Context);

    expect(response.status).toEqual(200);
    expect(response.body && response.body.guid).toEqual('1234');
  });

  it('should delete user', async () => {
    const response = await u.deleteUser(new Object() as Context);

    expect(response.status).toEqual(200);
    expect(response.body).toBeUndefined();
  });
});
