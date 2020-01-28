import { Context } from 'koa';

import * as userRepository from '../../repository/user';
import * as u from './actions';
import { IListParameters } from './types';

jest.mock('../../repository/user');

const mock = {
  userRepository: {
    exist: userRepository.exist as jest.Mock,
    getAll: userRepository.getAll as jest.Mock,
    getByEmail: userRepository.getByEmail as jest.Mock,
    getByGUID: userRepository.getByGUID as jest.Mock,
    save: userRepository.save as jest.Mock,
    verifyUser: userRepository.verifyUser as jest.Mock,
  },
}

describe('users actions', () => {
  it('should list all users', async () => {
    mock.userRepository.getAll.mockReturnValue([{}, { guid: '2' }, {}]);
    const ctx: {query: IListParameters} = { query: {} };

    const response = await u.listUsers(ctx as Context);

    expect(mock.userRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.body && response.body.data.length).toEqual(3);
    expect(response.body && response.body.data[1].guid).toEqual('2');
  });

  // it('should list all users on page 2', async () => {
  //   const ctx: {query: IListParameters} = {
  //     query: {
  //       limit: 5,
  //       page: 2,
  //     },
  //   };

  //   const response = await u.listUsers(ctx as Context);

  //   expect(response.status).toEqual(200);
  //   expect(response.body && response.body.data.length).toEqual(5);
  //   expect(response.body && response.body.data[2].guid).toEqual('8');
  // });

  it('should create user', async () => {
    mock.userRepository.save.mockReturnValue({});
    const response = await u.createUser(new Object() as Context);

    expect(mock.userRepository.save).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(201);
  });

  it('should fail to get user due to not found', async () => {
    mock.userRepository.getByGUID.mockReturnValue(undefined);
    const ctx: { params?: { guid: string } } = {
      params: {
        guid: 'not-found',
      },
    };
    await expect(u.getUser(ctx as Context)).rejects.toThrowError(/User not found/);
    expect(mock.userRepository.getByGUID).toHaveBeenCalledTimes(1);
  });

  it('should get user', async () => {
    mock.userRepository.getByGUID.mockReturnValue({guid: '1234'});
    const ctx: { params?: { guid: string } } = {
      params: {
        guid: '1234',
      },
    };

    const response = await u.getUser(ctx as Context);

    expect(mock.userRepository.getByGUID).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.body && response.body.guid).toEqual('1234');
  });

  // it('should fail to update user due to validation error', async () => {
  //   const ctx: { params?: { guid: string } } = {
  //     params: {
  //       guid: 'validation-error',
  //     },
  //   };

  //   await expect(u.updateUser(ctx as Context)).rejects.toThrowError(/Invalid payload provided/);
  // });

  // it('should update user', async () => {
  //   const ctx: { params?: { guid: string } } = {
  //     params: {
  //       guid: '1234',
  //     },
  //   };

  //   const response = await u.updateUser(ctx as Context);

  //   expect(response.status).toEqual(200);
  //   expect(response.body && response.body.guid).toEqual('1234');
  // });

  // it('should delete user', async () => {
  //   const response = await u.deleteUser(new Object() as Context);

  //   expect(response.status).toEqual(200);
  //   expect(response.body).toBeUndefined();
  // });
});
