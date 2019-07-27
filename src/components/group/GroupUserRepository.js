let db = require('../../db/connection');


let Repository = {
    findById(id){
        return db('group_user').select().where({id:id})
    },

    save(obj){
        return db('group_user').insert(obj)
    }
}

module.exports = Repository