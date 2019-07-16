var express = require('express');
var router = express.Router();

var NewsRouter = require('./News')


//all public routes
router.use('/news',NewsRouter);




module.exports = router;
