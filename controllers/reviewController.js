// controllers/reviewController.js
const pool = require('../db');

exports.addReview = async (req, res) => {
  const user_id = req.user.user_id;
  const { product_id, rating, comment } = req.body;

  try {
    await pool.query(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [user_id, product_id, rating, comment]
    );
    res.status(201).json({ message: 'Review submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductReviews = async (req, res) => {
  const { product_id } = req.params;
  try {
    const [reviews] = await pool.query(
      `SELECT r.review_id, u.name, r.rating, r.comment, r.created_at
       FROM reviews r
       JOIN users u ON r.user_id = u.user_id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC`,
      [product_id]
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
