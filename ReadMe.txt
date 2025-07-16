✅ Features in This Backend

All routes follow RESTful API design, with support for:

    🧍 User Auth: Register, login (JWT-based)

    🛍️ Products: Listing, single product view

    🧾 Cart: Add/remove/update products in cart

    📦 Orders: Place order, view user’s orders

    💳 Payments: Process & store payment info

    🌟 Reviews: Submit & fetch product reviews


📁 Folder Structure

ecommerce-backend/
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── paymentController.js
│   └── reviewController.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── orders.js
│   ├── payments.js
│   └── reviews.js
├── middlewares/
│   └── authMiddleware.js
├── models/ (optional if using SQL directly)
├── db.js
├── app.js
├── .env
└── package.json

🛠️ Tech Stack

    express, mysql2

    jsonwebtoken, bcryptjs

    dotenv, cors
