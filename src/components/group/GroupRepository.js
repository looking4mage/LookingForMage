let db = require('../../db/connection');


let Repository = {
    findById(id){
        return db('group').select().where({id:id})
    },

    save(obj){
        return db('group').insert(obj)
    }
}

module.exports = Repository