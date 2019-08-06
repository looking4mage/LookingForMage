let db = require('../../db/connection');


let Repository = {
    findById(id){
        return db('group').select().where({id:id})
    },

    save(obj){
        return db('group').insert(obj)
    },

    checkUser(group_id,user_id){
        return db('group_user').select().where({user_id:user_id,group_id:group_id})
    },
    getFullGroupInfo(group_id){
        return db('group').select('id','name','avatar').where({id:group_id})
    },
    getGroupEvents(group_id){
        return db('group_event').select('id','name','planned_to').where({group_id:group_id})
    },
    getGroupPosts(group_id){
        return db('group_post as gp').select('gp.id','gp.title','gp.content','u.user_name','u.id as author_id').where({group_id:group_id})
        .leftJoin('user as u',{"u.id":"gp.author_id"})
    }
}

module.exports = Repository