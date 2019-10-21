export interface IAction<T> {
  readonly status?: number;
  readonly body?: T;
}

export interface IPaginatedData {
  readonly pagination: {
    readonly current: number;
    readonly limit: number;
    readonly next?: string;
    readonly pages: number;
    readonly previous?: string;
    readonly results: number;
  };
  readonly data: ReadonlyArray<object>;
}

export interface IPaginationParametes {
  readonly limit?: number;
  readonly page?: number;
}

export interface IDataObject {
  readonly guid: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}

export interface IValidationError {
  readonly field: string;
  readonly message: string;
}
