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
  await mongoose.connect('mongodb://0.0.0.0:27017/test-global-filter');
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
function convertStringToObject(str) {
  const obj = {};
  const propertyArray = str.split(',');

  for (const property of propertyArray) {
    const [key, value] = property.split(':');
    obj[key] = isNaN(value) ? value : Number(value);
  }

  return obj;
}

function convertStringNumberToNumber(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be a valid object');
  }

  for (const key in obj) {
    if (typeof obj[key] === 'string' && !isNaN(obj[key])) {
      obj[key] = Number(obj[key]);
    }
  }

  return obj;
}
app.get('/users', async (req, res) => {
  try {
    if (req.query.search) {
      const users = await User.find({
        $and: Object.entries(
          convertStringNumberToNumber(convertStringToObject(req.query.search))
        ).map(([name, value]) => {
          return {
            [name]: typeof value === 'number' ? value : new RegExp(value, 'i'),
          };
        }),
      });
      return res.status(200).json({ length: users.length, data: users });
    } else {
      delete req.query['search'];
      const users = await User.find();
      res.status(200).json({ length: users.length, data: users });
    }
  } catch (error) {
    console.log('error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
