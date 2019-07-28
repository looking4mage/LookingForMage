var express = require('express');
var router = express.Router();

var config = require('../../config/global')


router.get('/',(req,res,next)=>{
 res.send('searcher')
})

module.exports = router;