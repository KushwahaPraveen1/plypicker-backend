const express = require('express');
const router = express.Router();
const { updateProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/update', authMiddleware, updateProduct);

module.exports = router;
