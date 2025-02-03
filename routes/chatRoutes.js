const express = require('express');
const { queryChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/query', queryChat);

module.exports = router;