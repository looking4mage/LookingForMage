import { Context } from 'koa';

import * as t from './types';

export async function listUsers(ctx: Context) {
  const params = ctx.query as t.IListParameters;
  const limit = parseInt(params.limit as string, 10) || 3;
  const page = parseInt(params.page as string, 10) || 1;

  const body: t.IListUsers = {
    pagination: {
      current: page,
      limit,
      results: 99999999999999,
      pages: 99999999999999 / limit,
      next: `http://localhost:3000/users?page=${page + 1}`,
      previous: (ctx.query.page - 1) ? `http://localhost:3000/users?page=${page - 1}` : undefined,
    },
    data: Array(limit).fill({}).map((_, i) => {
      return {
        email: 'jeff@jefferson.com',
        guid: `${i + 1 + (page * limit) - limit}`,
        location: {
          latitude: 0.00000,
          longitude: 0.00000,
          name: 'Jeffonapolis',
        },
        name: 'Jeff Jefferson',
      };
    }),
  };

  ctx.status = 200;
  ctx.body = body;
}

export async function createUser(ctx: Context) {
  const body: t.IUser = {
    email: 'jeff@jefferson.com',
    guid: `${123456}`,
    location: {
      latitude: 0.00000,
      longitude: 0.00000,
      name: 'Jeffonapolis',
    },
    name: 'Jeff Jefferson',
  };

  ctx.status = 201;
  ctx.body = body;
}

export async function getUser(ctx: Context) {
  const body: t.IUser = {
    email: 'jeff@jefferson.com',
    guid: ctx.params.guid,
    location: {
      latitude: 0.00000,
      longitude: 0.00000,
      name: 'Jeffonapolis',
    },
    name: 'Jeff Jefferson',
  };

  ctx.status = 200;
  ctx.body = body;
}

export async function deleteUser(ctx: Context) {
  ctx.status = 200;
}

export async function updateUser(ctx: Context) {
  const body: t.IUser = {
    email: 'jeff@jefferson.com',
    guid: ctx.params.guid,
    location: {
      latitude: 0.00000,
      longitude: 0.00000,
      name: 'Jeffonapolis',
    },
    name: 'Jeff Jefferson',
  };

  ctx.status = 200;
  ctx.body = body;
}
