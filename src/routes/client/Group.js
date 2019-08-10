var express = require('express');
var router = express.Router();

var config = require('../../config/global')
var GroupRepository = require('../../components/group/GroupRepository')
var GroupUserRepository = require('../../components/group/GroupUserRepository')
var GroupTypeRepository = require('../../components/group/GroupTypeRepository')
var UserRepository = require('../../components/user/UserRepository')

var MessageModel = require('../../components/communication/MessageModel')

router.get('/type-list',(req,res,next)=>{
    GroupTypeRepository.findAll().then(result=>{
        res.send(result);
    })
});

router.post('/create',(req,res,next)=>{
    let incomingData = req.body;
    GroupRepository.save(incomingData).then(group_id=>{
        GroupUserRepository.save({user_id:req.user.id,group_id:group_id[0],role_id:1}).then(result=>{
            UserRepository.getAllGroups(req.user.id).then(result=>{
                res.send(result)
              })
        })
    })

});

router.get('/:group_id',(req,res,next)=>{
    let groupId = req.params.group_id;
    
    GroupRepository.checkUser(groupId,req.user.id).then((result)=>{
        if(result.length>0){
            GroupRepository.getFullGroupInfo(groupId).then((groupResult)=>{
                let toSend = {};
                toSend.group = groupResult[0];
                GroupUserRepository.getGroupUsers(groupResult[0].id).then((groupUsers)=>{
                    toSend.users = groupUsers;
                    GroupRepository.getGroupEvents(groupResult[0].id).then((events)=>{
                        toSend.events = events;
                        GroupRepository.getGroupPosts(groupResult[0].id).then((posts)=>{
                            toSend.posts = posts;
                            res.send(toSend);
                        })
                        
                    })
                    
                })
            })
        }else{
            res.status(401).send(new MessageModel("Uzytkownik nie nalezy do grupy"))
        }
    })
});

router.post('/post/create',(req,res,next)=>{
    let incomingData = req.body;
    incomingData.author_id = req.user.id;

    GroupRepository.checkUser(incomingData.group_id,req.user.id).then((result)=>{
        if(result.length>0){
            GroupRepository.savePost(incomingData).then(()=>{
                res.status(200).end();
            });
        }else{
            res.status(401).send(new MessageModel("Uzytkownik nie nalezy do grupy"))
        }
    })
})

module.exports = router;