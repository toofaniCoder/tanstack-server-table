// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect database
// Connect to the MongoDB database using Mongoose

const connectToDatabase = async () => {
  await mongoose.connect('mongodb://0.0.0.0:27017/fullstack-tanstack');
  console.log('database connected');
};

connectToDatabase();
// define schemas
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/users', async (req, res) => {
  // console.log(req.query);
  const queryObj = { ...req.query };

  delete queryObj['sort'];

  let query = User.find(queryObj);
  // console.log(req.query);
  if (req.query.sort) {
    query.sort(
      req.query.sort
        .split(',')
        .map((el) => ({ [el.split(':')[0]]: el.split(':')[1] }))
        .reduce((merged, obj) => {
          return { ...merged, ...obj };
        }, {})
    );
  }

  const users = await query;
  res.status(200).json({ length: users.length, data: users });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
