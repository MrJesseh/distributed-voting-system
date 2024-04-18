import Datastore from "@seald-io/nedb";
import path from "node:path";

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

export class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.polls = new Datastore({ filename: path.join(import.meta.dirname, "./polls.db"), autoload: true });
    Database.instance = this;
  }

  async pollExists(id) {
    let data;
    try {
      data = await this.polls.findOneAsync({ id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
    return data != null;
  }

  async createPoll(title, options, isOpen) {
    let results = new Array(options.length).fill(0);
    let id = new Date().getTime();
    await this.polls.insertAsync({ id: id, title: title, options: options, results: results, isOpen: isOpen });
  }

  async incrementVote(id, option) {
    // Ensure the poll that we are attempting to increment exists.
    if (!this.pollExists(id)) {
      return false;
    }

    // Create the update dynamically so we can specify an index.
    const update = {};
    update[`results.${option}`] = 1;

    // Increment the specified vote.
    await this.polls.updateAsync({ id: id }, { $inc: update }, { upsert: false });
  }
}

export let db = new Database();