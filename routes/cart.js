// routes/cart.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

router.use(authMiddleware);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:cart_item_id', updateCartItem);
router.delete('/:cart_item_id', removeCartItem);

module.exports = router;
