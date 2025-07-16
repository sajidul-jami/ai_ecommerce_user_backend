// routes/orders.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { placeOrder, getOrders } = require('../controllers/orderController');

router.use(authMiddleware);

router.post('/', placeOrder);
router.get('/', getOrders);

module.exports = router;
