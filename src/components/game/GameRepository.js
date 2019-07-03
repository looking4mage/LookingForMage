class GameModel{
    constructor(){
        
    }

   findById(id){
        this.result = "GameModel"+id;
        return this.result;
    }



    toString(){
        return JSON.stringify(this.result);
    }

    save(){

    }
}
module.exports = GameModel;