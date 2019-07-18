var express = require('express');
var router = express.Router();
var NewsRepository = require('../../components/news/NewsRepository')

/* GET home page. */
router.get('/', function(req, res, next) {
    
    NewsRepository.findById(2).then((result)=>{
        res.json({routerName:"Client/News",data:result});
    })

    
});


module.exports = router;