import bcrypt from 'bcrypt';
import { Client, QueryConfig, QueryResult } from 'pg';
import uuid from 'uuid';

import * as userRepository from '../repository/user';
import { IUser } from '../components/users/types';
import { mockQuery } from './mock';

jest.mock('uuid');
jest.mock('bcrypt');

const mock = {
  uuid: { v4: uuid.v4 as jest.Mock },
  bcrypt: {
    compare: bcrypt.compare as jest.Mock,
    hash: bcrypt.hash as jest.Mock,
  },
}

describe('userRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(userRepository.getAll, () => {
    it('should return list of results', async () => {
      const result = await userRepository.getAll({ query: mockQuery([{}, {}, {}]) } as Client);

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(3);
    });

    it('should return no results', async () => {
      const result = await userRepository.getAll({ query: mockQuery([]) } as Client);

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(0);
    });
  });

  describe(userRepository.getByGUID, () => {
    it('should return single user', async () => {
      const result = await userRepository.getByGUID({ query: mockQuery([{email: 'USER_EMAIL'}]) } as Client, 'USER_GUID');

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('email');
    });

    it('should return undefined if no user has been found', async () => {
      const result = await userRepository.getByGUID({ query: mockQuery([]) } as Client, 'USER_GUID');

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });

  describe(userRepository.getByEmail, () => {
    it('should return single user', async () => {
      const result = await userRepository.getByEmail({ query: mockQuery([{guid: 'USER_GUID'}]) } as Client, 'USER_EMAIL');

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('guid');
    });

    it('should return undefined if no user has been found', async () => {
      const result = await userRepository.getByEmail({ query: mockQuery([]) } as Client, 'USER_EMAIL');

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should check if the user exists', async () => {
      const result1 = await userRepository.exist({ query: mockQuery([{}]) } as Client, { email: 'USER_EMAIL_1' } as IUser);
      const result2 = await userRepository.exist({ query: mockQuery([]) } as Client, { email: 'USER_EMAIL_2' } as IUser);

      expect(mockQuery).toHaveBeenCalledTimes(2);
      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    });
  });

  describe(userRepository.save, () => {
    it('should create user successfully', async () => {
      mock.uuid.v4.mockReturnValue('USER_GUID');
      mock.bcrypt.hash.mockResolvedValue('USER_HASHED_PASSWORD');

      const result = await userRepository.save({ query: mockQuery([{guid: 'USER_GUID'}]) } as Client, {
        email: 'USER_EMAIL',
        name: 'USER_NAME',
        password: 'USER_PASSWORD',
      });

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mock.uuid.v4).toHaveBeenCalledTimes(1);
      expect(mock.bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(result).toHaveProperty('guid');
    });

    it('should fail to create user due to incapibility of hashing password', async () => {
      mock.uuid.v4.mockReturnValue('USER_GUID');
      mock.bcrypt.hash.mockImplementation(() => { throw new Error('¯\_(ツ)_/¯'); });

      await expect(userRepository.save({ query: mockQuery([{guid: 'USER_GUID'}]) } as Client, {
        email: 'USER_EMAIL',
        name: 'USER_NAME',
        password: 'USER_PASSWORD',
      })).rejects.toThrow();
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mock.uuid.v4).toHaveBeenCalledTimes(1);
      expect(mock.bcrypt.hash).toHaveBeenCalledTimes(1);
    });
  });

  describe(userRepository.verifyUser, () => {
    it('should verify the user successfully', async () => {
      mock.bcrypt.compare.mockReturnValue(true);

      const result = await userRepository.verifyUser({ query: mockQuery([{guid: 'USER_GUID'}]) } as Client,
        'USER_EMAIL',
        'USER_PASSWORD',
      );

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mock.bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
    });

    it('should fail to verify the user due to missmatched password', async () => {
      mock.bcrypt.compare.mockReturnValue(false);

      const result = await userRepository.verifyUser({ query: mockQuery([{}]) } as Client,
        'USER_EMAIL',
        'USER_PASSWORD',
      );

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mock.bcrypt.compare).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should fail to verify the user due to no DB entry', async () => {
      mock.bcrypt.compare.mockReturnValue(true);

      const result = await userRepository.verifyUser({ query: mockQuery([]) } as Client,
        'USER_EMAIL',
        'USER_PASSWORD',
      );

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mock.bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
