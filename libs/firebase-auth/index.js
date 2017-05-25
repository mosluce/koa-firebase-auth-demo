const admin = require('firebase-admin');
const path = require('path');
const config = require('../../configs/firebase');
const { HttpError } = require('../types/error');

const serviceAccount = require(config.ACCOUNT_KEY || path.join(__dirname, 'serviceAccountKey.json'));

module.exports.init = () => async (ctx, next) => {
  ctx.firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${config.DATABASE_NAME}.firebaseio.com`,
  });

  await next();
};

module.exports.auth = () => async (ctx, next) => {
  const authorization = ctx.req.headers.Authorization || ctx.req.headers.authorization;
  const bearer = /^Bearer .+/;

  if (!bearer.test(authorization)) throw HttpError.unauthorized();

  const token = authorization.replace(/^Bearer /, '');

  ctx.user = await ctx.firebase.verifyIdToken(token);

  await next();
};
