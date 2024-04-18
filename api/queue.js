const db = require('./data/Database');
const Events = require('events');
const emitter = new Events();

module.exports = class Queue{
    constructor(){ this.queue = []; this.emitter = emitter;}
    send(item){ this.queue.push(item); console.log(`${JSON.stringify(item)} added to queue.`);}
    receive(){ return this.queue.shift(); }
    startProcessing(interval) {
        setInterval(async () => {
            const item = this.receive();
            if (item) {
                console.log(`Processing Vote: ${JSON.stringify(item)}`);

                // Increment the vote in the database.
                await db.incrementVote(item.id, item.option);

                // Send the votes through the event emitter showing that the queue has processed votes.
                let votes = await db.polls.findOneAsync({id: item.id});
                emitter.emit('processedQueue', votes);
            }
            
        }, interval);
    }
}