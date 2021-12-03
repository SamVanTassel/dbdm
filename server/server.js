import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;
import routes from './routes/pattern.js';
import dotenv from 'dotenv';
dotenv.config();

// set up default mongoose connection
import mongoose from 'mongoose';
const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dccrw.mongodb.net/dbdm?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// middleware to show us request bodies
app.use(express.json());
app.use(express.urlencoded());

// dummy mute functionality
app.get('/api/mute', (req, res) => {
  res.json({ message: 'total silence'});
});

// route all other calls to pattern router
app.use('/api', routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))