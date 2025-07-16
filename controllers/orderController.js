// controllers/orderController.js
const pool = require('../db');

exports.placeOrder = async (req, res) => {
  const user_id = req.user.user_id;
  const { shipping_address } = req.body;

  try {
    const [cart] = await pool.query(
      `SELECT ci.product_id, ci.quantity, p.price
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.cart_id
       JOIN products p ON ci.product_id = p.product_id
       WHERE c.user_id = ?`, [user_id]
    );

    if (!cart.length) return res.status(400).json({ message: 'Cart is empty' });

    const total_amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [orderResult] = await pool.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (?, ?, ?)',
      [user_id, total_amount, shipping_address]
    );

    const order_id = orderResult.insertId;

    const orderItems = cart.map(item => [order_id, item.product_id, item.quantity, item.price]);
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ?',
      [orderItems]
    );

    await pool.query(
      `DELETE ci FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.cart_id
       WHERE c.user_id = ?`, [user_id]
    );

    res.status(201).json({ message: 'Order placed successfully', order_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [user_id]);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
