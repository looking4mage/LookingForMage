let db = require('../../db/connection');
let Repository = {


    findById(id){
        return db('news').select().where({id:id})
    },
    
    save(obj){
        return db('news').insert(obj);
    }

}

module.exports = Repository