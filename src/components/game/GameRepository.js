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
        db(this.tableName).where('id',id).then(rows=>{
            return rows;
        })
    }



    toString(){
        return JSON.stringify(this.result);
    }

    save(){
        db(this.tableName).insert(this.record).then(()=>{
            
        })
    }
}
module.exports = GameModel;