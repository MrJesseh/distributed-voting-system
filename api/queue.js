module.exports = class Queue{
    constructor(){ this.queue = []; }
    send(item){ this.queue.push(item); console.log(`${JSON.stringify(item)} added to queue.`);}
    receieve(){ return this.queue.shift(); }
}