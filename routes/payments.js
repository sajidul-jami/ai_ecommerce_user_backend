// routes/payments.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createPayment, getPayments } = require('../controllers/paymentController');

router.use(authMiddleware);

router.post('/', createPayment);
router.get('/', getPayments);

module.exports = router;