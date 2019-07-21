module.exports = class UserModel{
    constructor(user_name,password,email,profile_id,gamer_profile_id){
        this.user_name = user_name;
        this.password = password;
        this.email = email;
        this.profile_id = profile_id;
        this.gamer_profile_id = gamer_profile_id;
    }
}