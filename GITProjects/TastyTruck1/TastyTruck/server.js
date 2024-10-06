// server.js

const express = require('express'); // Use 'import' if using TypeScript
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/loginDemo')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express server!'); // Simple response
});

// Create User (Register)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });

  try {
    await user.save();
    console.log(`User created: ${username}`); // Log successful user creation
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err.message); // Log error
    res.status(400).send('Error registering user: ' + err.message);
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    console.log(`Login failed: Invalid credentials for ${username}`); // Log failed login
    return res.status(400).send('Could not login: Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.log(`Login failed: Invalid password for ${username}`); // Log failed login
    return res.status(400).send('Could not login: Invalid credentials');
  }

  // Generate a token (optional)
  const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  console.log(`Login successful for ${username}`); // Log successful login
  res.send({ message: 'Login successful', token });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
