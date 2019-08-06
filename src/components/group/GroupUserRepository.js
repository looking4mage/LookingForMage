let db = require('../../db/connection');


let Repository = {
    findById(id){
        return db('group_user').select().where({id:id})
    },

    save(obj){
        return db('group_user').insert(obj)
    },
    getGroupUsers(group_id){
        return db('group_user as gu').select('u.id','u.user_name',"u.email").where({group_id:group_id})
        .leftJoin('user as u',{"u.id":"gu.user_id"})
    }
}

module.exports = Repository