var db = require('../../db/connection');
class RoomModel{
    constructor(name,thumbnail){
        this.tableName = 'room';
        if(name === undefined && thumbnail === undefined){
            
        }else{
            this.record = {
                //todo
            }
        }
        this.source = db(this.tableName);
    }


    save(){
        db(this.tableName).insert(this.record).then(()=>{
            
        })
    }
}
module.exports = new RoomModel;