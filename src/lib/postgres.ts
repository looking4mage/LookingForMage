import { Context } from 'koa';
import { Pool } from 'pg';

export async function postgres(ctx: Context, next: () => Promise<any>) {
  ctx.db = new Pool({
    connectionString: process.env.DATABASE_URL,
    statement_timeout: 1000,
    connectionTimeoutMillis: 1000,
  });

  await ctx.db.connect();
  await next();
  await ctx.db.end();
}
