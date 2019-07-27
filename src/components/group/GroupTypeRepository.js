let db = require('../../db/connection');


let Repository = {
    findAll(){
        return db('group_type').select()
    },

    save(obj){
        return db('group_type').insert(obj)
    }
}

module.exports = Repository