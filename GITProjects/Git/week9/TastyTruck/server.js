const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Correct path to your routes file
const app = express();
const port = 9002;
const cors = require('cors');
app.use(cors(
  { 
    origin: "http://localhost:4200"
  }
));

mongoose.set('strictQuery', false); 

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

connectDB();

app.use(express.json());

app.use('/', routes);

app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
