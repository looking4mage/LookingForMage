var express = require('express');
var router = express.Router();

var config = require('../../config/global')

var GroupRepository = require('../../components/group/GroupRepository')
var UserRepository = require('../../components/user/UserRepository')


router.get('/:word',async(req,res,next)=>{
    let data = {};

    data.users = await UserRepository.search(req.params.word);
    data.groups = await GroupRepository.search(req.params.word);

    res.send(data);
})

module.exports = router;