let db = require('../../db/connection');


let Repository = {


    findById(id){
        return db('user').select().where({id:id})
    },

    getByEmail(email){
        return db('user').select().where({email:email})
    },

    getFullUserData(user_id){
        return db('user as u').select('u.id','u.user_name','u.email','up.first_name','up.last_name').where('u.id',user_id)
        .leftJoin('user_profile as up',{'u.profile_id':'up.id'})
        .leftJoin('user_gamer_profile as ugp',{'u.gamer_profile_id':'ugp.id'})

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
        ,'group.avatar as group_avatar','group_type.avatar as type_avatar','group.id').where({user_id:user_id})
        .leftJoin('group as group',{'group.id':'group_user.group_id'})
        .leftJoin('group_type as group_type',{'group_type.id':'group.type_id'}).orderBy('group.id')
    },
    async getUserProfile(user_id){
        let data = await db('user as u').select('u.id','u.user_name','u.email').where({"u.id":user_id})
        .leftJoin('user_profile as up',{'u.profile_id':'up.id'})
        .then((result)=>{
           return result[0];
        })
        return data;
    }

}

module.exports = Repository