const Koa = require('koa');
const logger = require('koa-logger');
const path = require('path');

const staticMiddleware = require('./libs/koa-static-middleware');
const firebaseAuth = require('./libs/firebase-auth');
const router = require('./router');

const app = new Koa();

app.use(logger());
app.use(staticMiddleware(path.join(__dirname, 'public')));
app.use(firebaseAuth.init());
app.use(router.routes(), router.allowedMethods());

module.exports = app;
