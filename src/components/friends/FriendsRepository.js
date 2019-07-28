let db = require('../../db/connection');
let Repository = {

    findAll(user_id){
       return db('friends_list').select('friend_id').where({user_id:user_id})
    },
    
    save(obj){
        return db('friends_list').insert(obj);
    },



}

module.exports = Repository