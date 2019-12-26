import { Context } from 'koa';

import { IAction, NotFound, ValidationError, Exist } from '../../lib';
import { IUser } from './types';
import * as t from './types';
import * as userRepository from '../../repository/user';
import jwt from 'jsonwebtoken';

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

export async function createUser(_ctx: Context): Promise<IAction<t.IJwtToken>> {
  const user : IUser = _ctx.request.body;
  if(await userRepository.exist(_ctx.db,user)){
    throw new Exist("User exist");
  }
  const saved = await userRepository.save(_ctx.db,user);
  const token = jwt.sign(saved,'DUNNOCOZROBICZSECRET');

  return {
    status: 201,
    body: {
      token:token
    },
  };
}

export async function getUser(ctx: Context): Promise<IAction<t.IUser>> {
  if (ctx.params.guid === 'not-found') {
    throw new NotFound('User not found!');
  }
  const user = await userRepository.getByGUID(ctx.db,ctx.params.guid);

  return {
    status: 200,
    body: user,
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
      password:"1234"
    },
  };
}
