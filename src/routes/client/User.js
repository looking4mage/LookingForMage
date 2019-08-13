var express = require('express');
var router = express.Router();

var config = require('../../config/global')
var UserRepository = require("../../components/user/UserRepository")
var GroupRepository = require('../../components/group/GroupRepository')
var FriendRepository = require('../../components/friends/FriendsRepository')

router.get('/group-list',(req,res,next)=>{
  UserRepository.getAllGroups(req.user.id).then(result=>{
    
    res.send(result)
    
  })
})


router.get('/me',(req,res,next)=>{
  UserRepository.getFullUserData(req.user.id).then((result)=>{
    res.send(result[0]);
  })
})

router.get('/profile/:id',async (req,res,next)=>{
  let userId = req.params.id;
  let userProfile = await UserRepository.getUserProfile(userId);

  let data = {};
  data.achievement = [];
  data.user = userProfile;

  UserRepository.getAllGroups(userId).then((result)=>{
    data.groups = result;
    res.send(data);
  })
  
})

router.get('/friend/:userId',(req,res,next)=>{
    FriendRepository.friendRequest(req.user.id,req.params.userId).then(()=>{
      res.status(200).end();
    })  
})

router.get('/notification/friend',(req,res,next)=>{
  FriendRepository.getRequestsForUser(req.user.id).then((result)=>{
    res.send(result);
  })
})
module.exports = router;