// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');  // ✅ THIS WAS MISSING

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const reviewRoutes = require('./routes/reviews');



const app = express();

app.use(cors());
app.use(express.json());

// ✅ DB check route
app.get('/db-check', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.send('DB OK');
  } catch (err) {
    console.error(err); // helpful for debugging
    res.status(500).send('DB NOT WORKING');
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
