import { Context } from 'koa';

import { IAction, NotFound, ValidationError } from '../../lib';
import * as t from './types';

export async function listUsers(ctx: Context): Promise<IAction<t.IListUsers>> {
  const params = ctx.query as t.IListParameters;
  const limit = params.limit || 3;
  const page = params.page || 1;

  return {
    status: 200,
    body: {
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
    },
  };
}

export async function createUser(_ctx: Context): Promise<IAction<t.IUser>> {
  return {
    status: 201,
    body: {
      email: 'jeff@jefferson.com',
      guid: `${123456}`,
      location: {
        latitude: 0.00000,
        longitude: 0.00000,
        name: 'Jeffonapolis',
      },
      name: 'Jeff Jefferson',
    },
  };
}

export async function getUser(ctx: Context): Promise<IAction<t.IUser>> {
  if (ctx.params.guid === 'not-found') {
    throw new NotFound('User not found!');
  }

  return {
    status: 200,
    body: {
      email: 'jeff@jefferson.com',
      guid: ctx.params.guid,
      location: {
        latitude: 0.00000,
        longitude: 0.00000,
        name: 'Jeffonapolis',
      },
      name: 'Jeff Jefferson',
    },
  };
}

export async function deleteUser(_ctx: Context): Promise<IAction<undefined>> {
  return { status: 200 };
}

export async function updateUser(ctx: Context): Promise<IAction<t.IUser>> {
  if (ctx.params.guid === 'validation-error') {
    throw new ValidationError('Invalid payload provided...', [{ field: 'email', message: 'Valid email address is required.' }]);
  }

  return {
    status: 200,
    body: {
      email: 'jeff@jefferson.com',
      guid: ctx.params.guid,
      location: {
        latitude: 0.00000,
        longitude: 0.00000,
        name: 'Jeffonapolis',
      },
      name: 'Jeff Jefferson',
    },
  };
}
