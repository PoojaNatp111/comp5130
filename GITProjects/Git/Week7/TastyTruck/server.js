const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Correct path to your routes file
const app = express();
const port = 9002;

mongoose.set('strictQuery', false); // Avoid deprecated warning

// Function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/gbs", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Call the function to connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Define your routes
app.use('/', routes);

// Start the server
app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
