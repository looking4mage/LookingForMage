var express = require('express');
var router = express.Router();
var NewsRepository = require('../../components/news/NewsRepository')

/* GET home page. */
router.get('/', function(req, res, next) {
    
    NewsRepository.findAllPublic().then((result)=>{
        res.json({data:result});
    })
});


module.exports = router;