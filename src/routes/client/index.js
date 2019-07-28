var express = require('express');
var router = express.Router();

var NewsRouter = require('./News')
var UserRouter = require('./User')
var GroupRouter = require('./Group')
var SearcherRouter = require('./Search')


//all client routes
router.use('/news',NewsRouter);
router.use('/user',UserRouter);
router.use('/group',GroupRouter);
router.use('/search',SearcherRouter);


module.exports = router;
