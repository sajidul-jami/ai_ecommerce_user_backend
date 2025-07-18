const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // ✅ Fix this line
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,         // ✅ Optional, but safer
});

module.exports = pool;

