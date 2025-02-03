const User = require('../models/User');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtConfig');

exports.signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = new User({ email, password, name });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });

        // res.status(201).json({ message: 'User created successfully' });
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const cartData = await Cart.findOne({ user:user._id });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token, user, cartData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};