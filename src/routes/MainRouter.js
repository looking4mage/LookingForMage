var express = require('express');
var router = express.Router();

var ClientRouter = require('./client/index')




//Client
router.use('/client',ClientRouter);



/* GET 404 page. */
router.get('*', function(req, res, next) {
    res.json({apiName:"Looking For Mage",version:"v0.0.1",code:"404",message:"Route not found"});
});

module.exports = router;
