const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.verifyToken);

router.get('/', cartController.getCart);

router.post('/add', cartController.addItemToCart);

router.post('/remove', cartController.removeItemFromCart);

router.post('/update', cartController.updateCartItem);

module.exports = router;