import { Context, Middleware } from 'koa';
import winston from 'winston';

export function setupLogger(): winston.Logger {
  return winston.createLogger({
    level: process.env.DEBUG === 'true' ? 'debug' : 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'looking4mage-api' },
    transports: [
      new winston.transports.Console(),
    ],
  });
}

export function logger(log: winston.Logger): Middleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.log = log;

    await next();
  };
}
