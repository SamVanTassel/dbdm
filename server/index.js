const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// middleware to hopefully show us request bodies
app.use(express.json());
app.use(express.urlencoded());


app.get('/api/mute', (req, res) => {
  res.json({ message: 'total silence'});
});

app.get('/api/memory', (req, res) => {
  res.json({ message: 'express knows that you clicked load!'});
});

app.post('/api/memory', (req, res) => {
  console.log(req.body);
  res.json({ message: 'express acknowledges that you clicked save!'});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))