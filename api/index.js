// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route files
const itemRoutes = require('../routes/itemRoutes');
const cartRoutes = require('../routes/cartRoutes');
const authRoutes = require('../routes/authRoutes');
const chatRoutes = require('../routes/chatRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// API Routes
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('App is working!');
});

// Export the app as a serverless function for Vercel to handle requests
module.exports = (req, res) => {
    app(req, res); // Pass the request and response to your Express app
};

connectDB();
