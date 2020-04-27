const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://127.0.0.1/bookAPI_Test', { useNewUrlParser: true, useUnifiedTopology: true });
  // const db = mongoose.connect('mongodb://127.0.0.1/bookAPI_Test', { useNewUrlParser: true, useUnifiedTopology: true })
  //   .then(() => {
  //     console.log('Connected to Database :)');
  //   }).catch((err) => {
  //     console.log('Not Connected to Database ERROR! ', err);
  //   });
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
// const authorRouter = require('./routes/authorRouter')(Author);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
