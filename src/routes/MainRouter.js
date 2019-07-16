var express = require('express');
var router = express.Router();

var PublicRouter = require('./public/index')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({routername:"main"});
});

//Game
router.use('/public',PublicRouter);




module.exports = router;
