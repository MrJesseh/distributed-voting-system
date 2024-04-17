const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const path = require('path');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Queue stuff
const queue = require('./queue');
const q = new queue();

// Datastore stuff
const db = require('./data/Database');


// Routes =====================






io.on('connection', (socket) => {
  console.log('a user connected');
});

// Endpoint for getting the list of available polls.
app.get('/api/polls', async function (req, res){
  // Grab the poll id from the request params.
  let polls = await db.polls.findAsync();

  // Send the entire list of polls.
  return res.status(200).send(polls);
});

// Endpoint for posting vote to.
app.post('/api/polls',  express.json({ type: "*/*" }), async function(req, res){
  // Grab body from the request.
  let body = await req.body;

  // Grab the id and the option they selected from the body.
  let id = body.id;
  let option = body.option;

  // Add their vote to the queue to be processed.
  q.send({id: id, option: option});

  // Send http status and response.
  res.status(200).send();
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});