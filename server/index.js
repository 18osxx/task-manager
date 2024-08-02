const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config({ path: './.env' });

const mongodbUri = process.env.MONGODB_URI;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(mongodbUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
