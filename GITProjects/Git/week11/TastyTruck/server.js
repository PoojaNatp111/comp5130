const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Ensure this points to the correct routes file
const app = express();
const port = 9002;
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:4200'
}));

mongoose.set('strictQuery', false);

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/gbs', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectDB();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the appropriate service or SMTP host
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('Server is ready to take our messages:', success);
  }
});

app.use(express.json()); 

app.use('/', routes);

app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
