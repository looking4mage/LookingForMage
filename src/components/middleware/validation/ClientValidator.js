var jwt = require('jsonwebtoken');
var config = require('../../../config/global')
var Message = require('../../communication/MessageModel')
module.exports = function (req, res, next) {
    let token = req.headers['gamer-suit-token']
    
    if (token) {
      jwt.verify(token, config.app.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json(new Message('Token is not valid'));
        } else {
          if(decoded.exp < Date.now()){
            req.user = decoded;
            next();
          }else{
            return res.status(401).json(new Message('Token is expired'));
          }
          
        }
      });
    }else{
      return res.status(401).json(new Message('Token is not supplied'));
    }
}