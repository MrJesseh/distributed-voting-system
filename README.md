# Distributed Voting System

This Distributed Voting System is a real-time application built using Svelte for the frontend and Node.js, Express.js, Socket.IO, and NeDB on the backend. It allows users to vote on various polls, with the results updated in real-time via web sockets.

## Features

- Real-time vote updates using Socket.IO.
- Simple and responsive user interface developed with Svelte.
- Lightweight data storage with NeDB.
- Efficient vote processing through an internal queuing system.

## Prerequisites

Ensure you have Node.js installed on your machine to run the server. Node.js can be downloaded from [Node.js official website](https://nodejs.org/).

## Installation

To set up the project, clone the repository and install dependencies:

```bash
git clone https://github.com/MrJesseh/distributed-voting-system.git
cd distributed-voting-system
npm install
```

## Running the Application

1. Make sure you are in the root folder `/distributed-voting-system/

2. Run the start script.

```bash
./start.sh
```

Then navigate to `http://localhost:3000`.

## API Endpoints

`GET /api/polls`: Retrieves all available polls.

`POST /api/polls`: Submits a vote to a specific poll.
