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
