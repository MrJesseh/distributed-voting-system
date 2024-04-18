// Packages
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const path = require('path');

// Express stuff
const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

// CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Queue stuff
const queue = require('./queue');
const q = new queue();

// Datastore stuff
const db = require('./data/Database');

// Routes =====================

// Test route with index.html.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/index.html'));
});

// Socket stuff.
io.on('connection', (socket) => {
  console.log('A user has connected to the socket.');

  // Send the votes through the socket.
  q.emitter.on('processedQueue', (votes) => {
    socket.emit('votes', votes);
  });
});

// Endpoint for getting the list of available polls.
app.get('/api/polls', async function (req, res){
  // Grab the poll id from the request params.
  let polls = await db.polls.findAsync();

  // Send the entire list of polls.
  return res.status(200).send(polls);
});

// Endpoint for posting votes to.
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


// Open the port and start processing the queue.
server.listen(port);
q.startProcessing(1000);

