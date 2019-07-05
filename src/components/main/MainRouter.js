var express = require('express');
var router = express.Router();

var gameRouter = require('../game/GameRouter');
var gameAdminRouter = require('../game/GameAdminRouter');

var gameRouter = require('../room/RoomRouter');
var gameAdminRouter = require('../room/RoomAdminRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({routername:"main"});
});

//Game
router.use('/game',gameRouter);
router.use('/admin/game',gameAdminRouter);

//Game
router.use('/room',gameRouter);
router.use('/admin/room',gameAdminRouter);



module.exports = router;
