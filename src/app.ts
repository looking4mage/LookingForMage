import Koa from 'koa';
import Json from 'koa-json';
import Router from 'koa-router';

import { getHealthcheck } from './components/healthcheck';
import * as users from './components/users';
import { captureErrors, handle, handleErrors, logger, postgres, setupLogger } from './lib';

const log = setupLogger();
const app = new Koa();
const pubRouter = new Router();
const privRouter = new Router();

pubRouter.get('/healthcheck', handle(getHealthcheck));
pubRouter.post('/users', handle(users.createUser));

privRouter.get('/users', handle(users.listUsers));
privRouter.get('/users/:guid', handle(users.getUser));
privRouter.put('/users/:guid', handle(users.updateUser));
privRouter.del('/users/:guid', handle(users.deleteUser));

app.use(Json());
app.use(captureErrors);
app.use(logger(log));
app.use(postgres);

app.use(pubRouter.routes());
app.use(pubRouter.allowedMethods());

app.use(privRouter.routes());
app.use(privRouter.allowedMethods());

app.on('error', handleErrors);

const server = app.listen(process.env.PORT || 3000);
log.info('starting server', server.address());
