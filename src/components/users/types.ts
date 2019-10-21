import { IPaginatedData, IPaginationParametes } from '../../lib';

export interface IListParameters extends IPaginationParametes {
  readonly game?: string;
}

export interface IListUsers extends IPaginatedData {
  readonly data: ReadonlyArray<IUser>;
}

export interface IUser {
  readonly email: string;
  readonly guid: string;
  readonly location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly name: string;
  };
  readonly name: string;
}
