import Koa from 'koa';
import Json from 'koa-json';
import Logger from 'koa-logger';
import Router from 'koa-router';

import { getHealthcheck } from './components/healthcheck';
import * as users from './components/users';

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
app.use(Logger());

app.use(pubRouter.routes());
app.use(pubRouter.allowedMethods());

app.use(privRouter.routes());
app.use(privRouter.allowedMethods());

app.listen(process.env.PORT || 3000);
