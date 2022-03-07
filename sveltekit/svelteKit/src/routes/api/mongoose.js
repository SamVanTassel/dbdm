"use strict";
// Import the dependency.
import mongoose from 'mongoose';
import PatternSchema from './models/pattern.js'
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dccrw.mongodb.net/dbdm?retryWrites=true&w=majority`;
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
};

let conn = null;
const connect = async function() {
  if (conn === null) {
    conn = mongoose.connect(uri, options)
    .then(() => mongoose);
    await conn;
  }
  return conn;
}

// Handler
export default async (req, res) => {
  // Get the MongoClient by calling await on the promise.
  // Because it is a promise, it will only resolve once.
  const Pattern = await connect().model('Pattern', PatternSchema)
  // Use the client to return the name of the connected database.
  return Pattern;
}