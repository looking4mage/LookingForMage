let db = require('../../db/connection');
let Repository = {


    findById(id){
        return db('news').select().where({id:id})
    },
    findAllPublic(){
        return db('news').select('id',"title",'content','user_id').where({scope_id:3})
    },
    
    save(obj){
        return db('news').insert(obj);
    }

}

module.exports = Repository