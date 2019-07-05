var express = require('express');
var router = express.Router();
var RoomModel = require('./RoomRepository');

/* GET home page. */
router.get('/list', function(req, res, next) {
  // RoomModel.findAll().then((rows)=>{
  //   res.json(rows);
  // });
});


module.exports = router;