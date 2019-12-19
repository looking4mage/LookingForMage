import { Context } from 'koa';

import { IAction, NotFound, ValidationError } from '../../lib';
import * as t from './types';
import * as userRepository from '../../repository/user';

export async function listUsers(ctx: Context): Promise<IAction<t.IListUsers>> {
  const params = ctx.query as t.IListParameters;
  const users = await userRepository.getAll(ctx.db);
  if(users.length == 0){
    throw new NotFound("Users list is empty");
  }

  return {
    status: 200,
    body: {
      data: users
    },
  };
}

export async function createUser(_ctx: Context): Promise<IAction<t.IUser>> {
  return {
    status: 201,
    body: {
      email: 'jeff@jefferson.com',
      guid: `${123456}`,
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
      name: 'Jeff Jefferson',
    },
  };
}
