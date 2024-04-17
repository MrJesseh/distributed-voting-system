const Datastore = require('@seald-io/nedb');
const path = require('path');


/**
 Schemas

{
  id:
  title:
  options: [
    {
      text: ""
    }
  ],
}

{
  id:
  options: [0, 0 ,0 ,0 ,0 ]
}
*/

class Database {
    constructor(){
        this.polls = new Datastore({filename: path.join(__dirname, './polls.db'), autoload: true});
        this.votes = new Datastore({filename: path.join(__dirname, './votes.db'), autoload: true});
    }

}
module.exports = new Database();