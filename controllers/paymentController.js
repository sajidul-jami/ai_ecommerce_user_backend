// controllers/paymentController.js
const pool = require('../db');

exports.createPayment = async (req, res) => {
  const user_id = req.user.user_id;
  const { order_id, amount, method } = req.body;

  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE order_id = ? AND user_id = ?', [order_id, user_id]);
    if (!orders.length) return res.status(404).json({ message: 'Order not found or unauthorized' });

    await pool.query(
      'INSERT INTO payments (order_id, amount, method, status) VALUES (?, ?, ?, ?)',
      [order_id, amount, method, 'Completed']
    );

    res.status(201).json({ message: 'Payment recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPayments = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const [payments] = await pool.query(
      `SELECT p.* FROM payments p
       JOIN orders o ON p.order_id = o.order_id
       WHERE o.user_id = ?`, [user_id]
    );
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
