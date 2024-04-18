const Datastore = require('@seald-io/nedb');
const path = require('path');


/**
 Schemas

{
    id: number;
    title: string;
    options: string[];
    results: number[];
    isOpen: boolean;
}
*/

class Database {
    constructor(){
        if(Database.instance){
            return Database.instance;
        }

        this.polls = new Datastore({filename: path.join(__dirname, './polls.db'), autoload: true});
        Database.instance = this;
    }

    async pollExists(id){
        let data;
        try{
            data = await this.polls.findOneAsync({id: id});
        }catch(error){
            console.log(error);
            return false;
        }
        if(data == null){
            return false;
        }
        return true;
    }
    
    async incrementVote(id, option){
        // Ensure the poll that we are attempting to increment exists.
        if(!this.pollExists(id)){return false;}

        // Create the update dynamically so we can specify an index.
        const update = {};
        update[`results.${option}`] = 1;

        // Increment the specified vote.
        await this.polls.updateAsync({id: id}, { $inc: update }, {upsert: false});
    }
}
module.exports = new Database();