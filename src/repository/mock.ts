import { QueryConfig, QueryResult } from 'pg';

export const mockQuery = jest.fn().mockImplementation(data =>
  (_cfg: string | QueryConfig<any>): Promise<QueryResult<any>> => Promise.resolve({
    command: '',
    fields: [],
    rowCount: data?.length || 0,
    rows: data,
    oid: 0,
  }));
