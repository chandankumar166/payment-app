const express = require('express');
const {accountRouter} = require('./account');
const {userRouter} = require('./user');

const apiRouter = express.Router();

apiRouter.use('/user', userRouter)
apiRouter.use('/account', accountRouter);

module.exports = {apiRouter}