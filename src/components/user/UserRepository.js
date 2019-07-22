let db = require('../../db/connection');


let Repository = {


    findById(id){
        return db('user').select().where({id:id})
    },

    getByEmail(email){
        return db('user').select().where({email:email})
    },
    
    save(obj){
        return db('user').insert(obj);
    },

    createProfile(obj){
        return db('user_profile').insert(obj)
    },

    createGamerProfile(obj){
        return db('user_gamer_profile').insert(obj)
    },

}

module.exports = Repository