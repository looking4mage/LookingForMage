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

    getAllGroups(user_id){
        return db('group_user').select('group.name as group_name','group_type.name as type_name'
        ,'group.avatar as group_avatar','group_type.avatar as type_avatar').where({user_id:user_id})
        .leftJoin('group as group',{'group.id':'group_user.group_id'})
        .leftJoin('group_type as group_type',{'group_type.id':'group.type_id'})
    },

}

module.exports = Repository