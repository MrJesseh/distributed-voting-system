// Packages
import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server } from "socket.io";
import { Queue } from "./queue.js";
import { db } from "./data/Database.js";
import { handler } from "../ui/build/handler.js";

// Express stuff
const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

// CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// SvelteKit health check and handler
app.get("/healthcheck", (req, res) => {
  res.end("ok");
});

// Queue stuff
const q = new Queue();

// Routes =====================

// Socket stuff.
io.on("connection", (socket) => {
  console.log("A user has connected to the socket.");

  // Send the votes through the socket.
  q.emitter.on("processedQueue", (votes) => {
    socket.emit("votes", votes);
  });
});

// Endpoint for getting the list of available polls.
app.get("/api/polls", async function(req, res) {
  // Grab the poll id from the request params.
  let polls = await db.polls.findAsync();

  // Send the entire list of polls.
  return res.status(200).send(polls);
});

// Endpoint for posting votes to.
app.post("/api/polls", express.json({ type: "*/*" }), async function(req, res) {
  // Grab body from the request.
  let body = await req.body;

  // Grab the id and the option they selected from the body.
  let id = body.id;
  let option = body.option;

  // Add their vote to the queue to be processed.
  q.send({ id: id, option: option });

  // Send http status and response.
  res.status(200).send();
});

// SvelteKit handler
app.use(handler);

// Open the port and start processing the queue.
server.listen(port);
q.startProcessing(1000);

