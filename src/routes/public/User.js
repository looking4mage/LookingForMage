var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;



var UserRepository = require('../../components/user/UserRepository')

var UserProfile = require('../../components/user/UserProfileModel')
var User = require('../../components/user/UserModel')
var UserGamerProfile = require('../../components/user/UserGamerProfileModel')

var Message = require('../../components/communication/MessageModel')

/* POST user create. */
router.post('/create', function(req, res, next) {



  let incomingData = req.body;
  let hashedPassword = bcrypt.hashSync(incomingData.password, saltRounds);
  let UserProfileData = new UserProfile(incomingData.first_name,incomingData.last_name);
  


  UserRepository.getByEmail(incomingData.email).then(result=>{
    if(result.length !== 0){
      res.status(400).json({message:"Email is used"})
    }else{
      UserRepository.createProfile(UserProfileData).then(resulUP=>{
        UserRepository.createGamerProfile(new UserGamerProfile()).then(resultUGP=>{
          let UserData = new User(incomingData.user_name,hashedPassword,incomingData.email,resulUP,resultUGP)
          UserRepository.save(UserData).then(data=>{
            res.send(new Message('Uzytkownik został utworzony'))
          });
        })
      });
    }
  });
    
});


module.exports = router;