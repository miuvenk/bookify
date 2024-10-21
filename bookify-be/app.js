const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoutes = require('./routes/bookRoute');
const userRoutes = require('./routes/userRoute');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const checkDatabaseExists = async () => {
  const admin = mongoose.connection.db.admin();
  const databases = await admin.listDatabases();
  
  const dbExists = databases.databases.some(db => db.name === 'bookifydb');

  if (!dbExists) {
    console.log('Database does not exist. It will be created automatically on the first write.');
  } else {
    console.log('Database already exists.');
  }
};

mongoose.connect('mongodb://localhost:27017/bookifydb')
  .then(() => {
    console.log('Connected to MongoDB.');
    return checkDatabaseExists();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
