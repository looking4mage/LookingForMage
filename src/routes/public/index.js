var express = require('express');
var router = express.Router();

var UserRouter = require('./User')
var NewsRouter = require('./News')


//all client routes
router.use('/user',UserRouter);
router.use('/news',NewsRouter);


module.exports = router;
