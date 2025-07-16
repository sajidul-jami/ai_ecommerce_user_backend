// routes/reviews.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { addReview, getProductReviews } = require('../controllers/reviewController');

router.use(authMiddleware);

router.post('/', addReview);
router.get('/:product_id', getProductReviews);

module.exports = router;