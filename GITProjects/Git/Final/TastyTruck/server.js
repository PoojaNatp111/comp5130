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

const FoodItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  timeToPrepare: { type: String, required: true },
  cuisine: { type: [String], required: true },
});

// Create the FoodItem model
const FoodItem = mongoose.model('FoodItem', FoodItemSchema);

// Route to add a food item
app.post('/add-food-item', async (req, res) => {
  try {
    const newFoodItem = new FoodItem(req.body);
    await newFoodItem.save();
    res.status(201).json({ message: 'Food item added successfully', item: newFoodItem });
  } catch (error) {
    console.error('Error adding food item:', error);
    res.status(500).json({ message: 'Error adding food item', error });
  }
});

// Route to fetch all food items
app.get('/get-food-items', async (req, res) => {
  try {
    const foodItems = await FoodItem.find(); // Fetch all items from the collection
    console.log('Fetched Food Items:', foodItems); // Log the fetched items
    res.status(200).json(foodItems); // Send the items as JSON response
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ message: 'Error fetching food items', error });
  }
});

// Route to delete a food item by ID
app.delete('/delete-food-item/:id', async (req, res) => {
  const { id } = req.params; // Extract the item ID from the request parameters

  try {
    const deletedItem = await FoodItem.findByIdAndDelete(id); // Remove the item from the database
    if (!deletedItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully', item: deletedItem });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ message: 'Error deleting food item', error });
  }
});

// Define Order Schema and Model
const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  totalPrice: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

// Route to create an order
app.post('/create-order', async (req, res) => {
  try {
    const { totalPrice, totalItems } = req.body;
    const orderId = `ORDER-${Date.now()}`; // Generate unique order ID

    const newOrder = new Order({
      orderId,
      totalPrice,
      totalItems,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
    console.log('Order created successfully');
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
});

app.get('/get-orders', async (req, res) => {
  try {
    const orders = await Order.find(); 
    res.status(200).json(orders); 
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});


app.listen(port, (error) => {
  if (error) {
    console.error('Error starting the server:', error);
  } else {
    console.log(`Server is running on http://localhost:${port}`);
  }
});
