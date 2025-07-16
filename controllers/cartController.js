// controllers/cartController.js
const pool = require('../db');

exports.getCart = async (req, res) => {
  try {
    const [cart] = await pool.query(
      `SELECT ci.cart_item_id, p.name, p.price, ci.quantity, p.image_url
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.cart_id
       JOIN products p ON ci.product_id = p.product_id
       WHERE c.user_id = ?`, [req.user.user_id]
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const [[userCart]] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [req.user.user_id]);
    let cart_id = userCart?.cart_id;

    if (!cart_id) {
      const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [req.user.user_id]);
      cart_id = result.insertId;
    }

    const [[existing]] = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart_id, product_id]
    );

    if (existing) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE cart_item_id = ?',
        [quantity, existing.cart_item_id]
      );
    } else {
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
        [cart_id, product_id, quantity]
      );
    }

    res.status(201).json({ message: 'Added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const { cart_item_id } = req.params;
  const { quantity } = req.body;
  try {
    await pool.query('UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?', [quantity, cart_item_id]);
    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeCartItem = async (req, res) => {
  const { cart_item_id } = req.params;
  try {
    await pool.query('DELETE FROM cart_items WHERE cart_item_id = ?', [cart_item_id]);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
