const express = require('express');
const router = express.Router();

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

module.exports = router;
