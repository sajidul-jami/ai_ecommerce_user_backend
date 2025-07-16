// controllers/productController.js
const pool = require('../db');

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [product] = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);
    if (!product.length) return res.status(404).json({ message: 'Product not found' });
    res.json(product[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
