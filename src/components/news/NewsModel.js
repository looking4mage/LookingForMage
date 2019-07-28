module.exports = class NewsModel{
    constructor(title,content,user_id,scope){
        this.title = title;
        this.content = content;
        this.user_id = user_id;
        this.scope_id = scope;
    }
}