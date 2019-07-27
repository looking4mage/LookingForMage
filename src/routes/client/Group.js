var express = require('express');
var router = express.Router();

var config = require('../../config/global')
var GroupRepository = require('../../components/group/GroupRepository')
var GroupUserRepository = require('../../components/group/GroupUserRepository')
var GroupTypeRepository = require('../../components/group/GroupTypeRepository')

router.get('/type-list',(req,res,next)=>{
    GroupTypeRepository.findAll().then(result=>{
        res.send(result);
    })
});

router.get('/create',(req,res,next)=>{
    let incomingData = req.body;
    GroupRepository.save(incomingData).then(group_id=>{
        GroupUserRepository.save({user_id:req.user.id,group_id:group_id[0],role_id:1}).then(result=>{
            res.status(200).end();
        })
    })

});

module.exports = router;