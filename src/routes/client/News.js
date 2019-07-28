var express = require('express');
var router = express.Router();
var NewsRepository = require('../../components/news/NewsRepository')

var NewsModel = require('../../components/news/NewsModel')

/* GET home page. */
router.post('/create', function(req, res, next) {
    let incomingData = req.body;
    let news = new NewsModel(incomingData.title,incomingData.content,req.user.id,incomingData.scope)
    NewsRepository.save(news).then(result=>{
        res.status(200).end();
    });
    
});

router.get('/',function(req,res,next){
    res.send('client news')
})


module.exports = router;