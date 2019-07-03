var express = require('express');
var router = express.Router();
var GameModel = require('../game/GameRepository');

var gameRouter = require('../game/GameRouter');
var gameAdminRouter = require('../game/GameAdminRouter');

/* GET home page. */
router.get('/', function(req, res, next) {

  Game = new GameModel();
  Game.findById(1);
  res.json(Game.toString());
});

//Game
router.use('/game',gameRouter);
router.use('/admin/game',gameAdminRouter);



module.exports = router;
