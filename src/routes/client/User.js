var express = require('express');
var router = express.Router();

var config = require('../../config/global')
var UserRepository = require("../../components/user/UserRepository")
var GroupRepository = require('../../components/group/GroupRepository')

router.get('/group-list',(req,res,next)=>{
  UserRepository.getAllGroups(req.user.id).then(result=>{
    
    res.send(result)
    
  })
});


router.get('/me',(req,res,next)=>{
  UserRepository.getFullUserData(req.user.id).then((result)=>{
    res.send(result[0]);
  })
});

module.exports = router;