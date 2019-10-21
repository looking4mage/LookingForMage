import Koa from 'koa';
import Json from 'koa-json';
import accessLogger from 'koa-logger';
import Router from 'koa-router';

import { getHealthcheck } from './components/healthcheck';
import * as users from './components/users';
import { logger, postgres } from './lib';

const app = new Koa();
const pubRouter = new Router();
const privRouter = new Router();

pubRouter.get('/healthcheck', getHealthcheck);
pubRouter.post('/users', users.createUser);

privRouter.get('/users', users.listUsers);
privRouter.get('/users/:guid', users.getUser);
privRouter.put('/users/:guid', users.updateUser);
privRouter.del('/users/:guid', users.deleteUser);

app.use(Json());
app.use(logger);
app.use(accessLogger());
app.use(postgres);

app.use(pubRouter.routes());
app.use(pubRouter.allowedMethods());

app.use(privRouter.routes());
app.use(privRouter.allowedMethods());

app.listen(process.env.PORT || 3000);
