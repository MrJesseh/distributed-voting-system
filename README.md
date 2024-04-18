# Distributed Voting System

This Distributed Voting System is a real-time application built using Svelte for the frontend and Node.js, Express.js, Socket.IO, and NeDB on the backend. It allows users to vote on various polls, with the results updated in real-time via web sockets.

## Features

- Real-time vote updates using Socket.IO.
- Simple and responsive user interface developed with Svelte.
- Lightweight data storage with NeDB.
- Efficient vote processing through an internal queuing system.

## Prerequisites

Ensure you have Node.js installed on your machine to run the server. Node.js can be downloaded from [Node.js official website](https://nodejs.org/).

## Installation & Running the Project

1. Clone the repository:
```bash
git clone https://github.com/MrJesseh/distributed-voting-system.git
```

2. Make sure you are in the root folder `/distributed-voting-system/`

3. Run the start script.

```bash
./start.sh
```

Then navigate to `http://localhost:3000`.

## API Endpoints

`GET /api/polls`: Retrieves all available polls.

`POST /api/polls`: Submits a vote to a specific poll.

For the post request, the body should be as follows:
```json
{
    "id": 1,
    "option": 1
}
```
Where `id` (number) is the id of the poll you are posting a vote to, and `option` (number) is the index of the option the person chose.
