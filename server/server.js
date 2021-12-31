import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import memoryRouter from './routes/memory.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// set up default mongoose connection
const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dccrw.mongodb.net/dbdm?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// middleware to show us request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route memory calls to memory router
app.use('/memory', memoryRouter);

// route all other calls to 404 error handler
app.use((req, res) => res.status(404).json('Endpoint could not be found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `A default server error occurred: ${err}`,
    status: 500,
    message: { err: 'Default server error' },
  };
  console.log(defaultErr.log);
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
