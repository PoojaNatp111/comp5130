const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// In-memory array to store users
const users = [];


// Route to create a new user
router.post('/users/create', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(req.body);
  
  // Check if user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Store the new user in the users array
  users.push({ firstname, lastname, email, password });
  res.status(200).json({ message: "User created successfully" });
});

// Route for login using GET
router.get('/users/login', (req, res) => {
    const { email, password } = req.query;
    console.log(req.query);
  
    // Find user in the stored users array
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
});

// Route for login using POST
router.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  // Find user in the stored users array
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post('/users/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  console.log(`Password reset request for: ${email}`);

  // Check if the user exists in your logic
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(404).send('User not found');
  }

  // Generate a token for the password reset (use more secure methods for real applications)
  const token = crypto.randomBytes(20).toString('hex');

  // Create the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this if using another provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Set up the email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Use this link: http://localhost:4200/reset-password?token=${token}`,
  };

  // Add the try-catch block here
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Password reset link sent');
  } catch (error) {
    console.error('Error sending email:', error); // Log the detailed error
    res.status(500).send('Error sending password reset email');
  }
});

router.post('/users/reset-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email, old password, and new password are required' });
  }

  // Find user by email
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's password
  user.password = newPassword;
  res.status(200).json({ message: 'Password updated successfully' });
});

module.exports = router;