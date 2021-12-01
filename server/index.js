import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;
import router from './router.js';

// set up default mongoose connection
import mongoose from 'mongoose';
const MONGO_URI = 'mongodb+srv://test:test@cluster0.dccrw.mongodb.net/dbdm?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));


// middleware to show us request bodies
app.use(express.json());
app.use(express.urlencoded());

app.get('/api/mute', (req, res) => {
  res.json({ message: 'total silence'});
});

// LOAD button functionality
app.get('/api/memory/:bank/:slot', (req, res) => {
  // get pattern from database at bank -> slot
  console.log(req.params.bank + ', ' + req.params.slot);
  res.json({ pattern: new Array(16).fill(true)});
});

// SAVE button functionality
app.post('/api/memory/:bank/:slot', (req, res) => {
  console.log(req.params.bank + ', ' + req.params.slot);
  console.log(req.body.pattern);
  res.json({ message: 'express acknowledges that you clicked save!'});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))