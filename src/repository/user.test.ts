import bcrypt from 'bcrypt';
import { Client, QueryConfig, QueryResult } from 'pg';
import uuid from 'uuid';

import * as userRepository from '../repository/user';
import { IUser } from '../components/users/types';

jest.mock('uuid');
jest.mock('bcrypt');

const fakeQuery = jest.fn().mockImplementation(data =>
  (_cfg: string | QueryConfig<any>): Promise<QueryResult<any>> => Promise.resolve({
    command: '',
    fields: [],
    rowCount: data?.length || 0,
    rows: data,
    oid: 0,
  }));

describe('userRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(userRepository.getAll, () => {
    it('should return list of results', async () => {
      const result = await userRepository.getAll({ query: fakeQuery([{}, {}, {}]) } as Client);

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(3);
    });

    it('should return no results', async () => {
      const result = await userRepository.getAll({ query: fakeQuery([]) } as Client);

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(0);
    });
  });

  describe(userRepository.getByGUID, () => {
    it('should return single user', async () => {
      const result = await userRepository.getByGUID({ query: fakeQuery([{email: 'USER_EMAIL'}]) } as Client, 'USER_GUID');

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('email');
    });

    it('should return undefined if no user has been found', async () => {
      const result = await userRepository.getByGUID({ query: fakeQuery([]) } as Client, 'USER_GUID');

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });

  describe(userRepository.getByEmail, () => {
    it('should return single user', async () => {
      const result = await userRepository.getByEmail({ query: fakeQuery([{guid: 'USER_GUID'}]) } as Client, 'USER_EMAIL');

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('guid');
    });

    it('should return undefined if no user has been found', async () => {
      const result = await userRepository.getByEmail({ query: fakeQuery([]) } as Client, 'USER_EMAIL');

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should check if the user exists', async () => {
      const result1 = await userRepository.exist({ query: fakeQuery([{}]) } as Client, { email: 'USER_EMAIL_1' } as IUser);
      const result2 = await userRepository.exist({ query: fakeQuery([]) } as Client, { email: 'USER_EMAIL_2' } as IUser);

      expect(fakeQuery).toHaveBeenCalledTimes(2);
      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    });
  });

  describe(userRepository.save, () => {
    it('should create user successfully', async () => {
      uuid.v4.mockReturnValue('USER_GUID');
      bcrypt.hash.mockResolvedValue('USER_HASHED_PASSWORD');

      const result = await userRepository.save({ query: fakeQuery([{guid: 'USER_GUID'}]) } as Client, {
        email: 'USER_EMAIL',
        name: 'USER_NAME',
        password: 'USER_PASSWORD',
      });

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(uuid.v4).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('guid');
    });

    it('should fail to create user due to incapibility of hashing password', async () => {
      uuid.v4.mockReturnValue('USER_GUID');
      bcrypt.hash.mockImplementation(() => { throw new Error('¯\_(ツ)_/¯'); });

      await expect(userRepository.save({ query: fakeQuery([{guid: 'USER_GUID'}]) } as Client, {
        email: 'USER_EMAIL',
        name: 'USER_NAME',
        password: 'USER_PASSWORD',
      })).rejects.toThrow();
      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(uuid.v4).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    });
  });

  describe(userRepository.verifyUser, () => {
    it('should verify the user successfully', async () => {
      bcrypt.compare.mockReturnValue(true);

      const result = await userRepository.verifyUser({ query: fakeQuery([{guid: 'USER_GUID'}]) } as Client,
        'USER_EMAIL',
        'USER_PASSWORD',
      );

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(result).toEqual(true);
    });

    it('should fail to verify the user due to missmatched password', async () => {
      bcrypt.compare.mockReturnValue(false);

      const result = await userRepository.verifyUser({ query: fakeQuery([{}]) } as Client,
        'USER_EMAIL',
        'USER_PASSWORD',
      );

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(result).toEqual(false);
    });

    it('should fail to verify the user due to no DB entry', async () => {
      bcrypt.compare.mockReturnValue(true);

      const result = await userRepository.verifyUser({ query: fakeQuery([]) } as Client,
        'USER_EMAIL',
        'USER_PASSWORD',
      );

      expect(fakeQuery).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toEqual(false);
    });
  });
});
