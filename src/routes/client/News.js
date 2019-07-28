var express = require('express');
var router = express.Router();
var NewsRepository = require('../../components/news/NewsRepository')
var FriendsRepository = require('../../components/friends/FriendsRepository')

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
    FriendsRepository.findAll(req.user.id).then(result=>{
        let list = result.map(item=>{
            return item.friend_id
        })
        NewsRepository.getNewsForUser(list).then(news => {
            res.send(news);
        })
    })
})


module.exports = router;