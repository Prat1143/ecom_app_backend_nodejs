const Cart = require('../models/Cart');
const Item = require('../models/Item');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItemToCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        // Fetch the item details to get the price
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const itemPrice = item.variantPrice;
        const totalCost = itemPrice * quantity;

        const cart = await Cart.findOne({ user: req.user.id });

        if (cart) {
            const itemIndex = cart.items.findIndex(cartItem => cartItem.item.toString() === itemId);

            if (itemIndex > -1) {
                // Item exists, update the quantity and total cost
                cart.items[itemIndex].quantity += quantity;
                cart.items[itemIndex].totalCost = itemPrice * cart.items[itemIndex].quantity;
            } else {
                // Item does not exist, add it to the cart
                cart.items.push({ item: itemId, quantity, totalCost });
            }

            await cart.save();
            res.status(200).json(cart);
        } else {
            // Create a new cart if it doesn't exist
            const newCart = new Cart({
                user: req.user.id,
                items: [{ item: itemId, quantity, totalCost }]
            });
            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { itemId } = req.body;
    
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: req.user.id },
            { $pull: { items: { item: itemId } } },
            { new: true }
        ).populate('items.item');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateCartItem = async (req, res) => {
    const { itemId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item => item.item.toString() === itemId);

        // Fetch the item details to get the price
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const itemPrice = item.variantPrice;
        const totalCost = itemPrice * quantity;

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].totalCost = totalCost;
        } else {
            cart.items.push({ item: itemId, quantity, totalCost });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};