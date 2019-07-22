var express = require('express');
var router = express.Router();

var ClientRouter = require('./client/index')
var PublicRouter = require('./public/index')

var ClientValidator = require('../components/middleware/validation/ClientValidator')


//Client
router.use('/client',ClientValidator,ClientRouter);
router.use('/public',PublicRouter);





/* GET 404 page. */
router.get('*', function(req, res, next) {
    res.json({apiName:"Looking For Mage",version:"v0.0.1",code:"404",message:"Route not found"});
});

module.exports = router;
