var db = require('../../db/connection');
class GameModel{
    constructor(name,thumbnail){
        this.tableName = 'game';
        if(name === undefined && thumbnail === undefined){
            
        }else{
            this.record = {
                name:name,
                thumbnail:thumbnail
            }
        }
        this.source = db(this.tableName);
    }

   findById(id){
        return db(this.tableName).where('id',id);
    }
    findAll(){
        return db(this.tableName);
    }


    save(){
        db(this.tableName).insert(this.record).then(()=>{
            
        })
    }
}
module.exports = new GameModel;