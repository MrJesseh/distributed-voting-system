const db = require('./data/Database');

module.exports = class Queue{
    constructor(){ this.queue = [];}
    send(item){ this.queue.push(item); console.log(`${JSON.stringify(item)} added to queue.`);}
    receive(){ return this.queue.shift(); }
    startProcessing(interval) {
        setInterval(() => {
            const item = this.receive();
            if (item) {
                console.log(`Processing Vote: ${JSON.stringify(item)}`);
                db.incrementVote(item.id, item.option);
            }
        }, interval);
    }
}