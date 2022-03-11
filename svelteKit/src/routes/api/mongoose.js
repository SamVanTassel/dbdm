"use strict";
// Import the dependency.
import mongoose from 'mongoose';
import PatternSchema from './models/pattern.js'

import.meta.env.VITE_DB_USERNAME;
import.meta.env.VITE_DB_PASSWORD;

const uri = `mongodb+srv://test:amuchlongertestpassword@cluster0.dccrw.mongodb.net/dbdm?retryWrites=true&w=majority`;
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
  let pool = await connect()
  // Use the client to return the name of the connected database.
  return pool.model('Pattern', PatternSchema)
}