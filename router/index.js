const Router = require('koa-router');
const firauth = require('../libs/firebase-auth');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'welcome';
});

router.get('/abc', (ctx) => {
  ctx.body = 'welcome abc';
});

router.get('/protected', firauth.auth(), (ctx) => {
  ctx.body = {
    user: ctx.user,
  };
});

module.exports = router;
