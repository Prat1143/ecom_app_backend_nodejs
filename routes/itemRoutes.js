const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAllItems);
router.get('/search', itemController.searchItems);
router.get('/:sku', itemController.getItemBySKU);
router.get('/getProductDetails/:id', itemController.getProductDetails);
router.post('/', itemController.createItem);
router.put('/:sku', itemController.updateItem);
router.delete('/:sku', itemController.deleteItem);

module.exports = router;