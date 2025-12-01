require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", require("./modules/auth/auth.routes"));
app.use("/api/v1/users", require("./modules/users/user.routes"));
app.use("/api/v1/products", require("./modules/products/product.routes"));
app.use("/api/v1/categories", require("./modules/categories/category.routes"));
app.use("/api/v1/cart", require("./modules/cart/cart.routes"));
app.use("/api/v1/orders", require("./modules/orders/order.routes"));
app.use("/api/v1/payments", require("./modules/payments/payment.routes"));
app.use("/api/v1/cms", require("./modules/cms/cms.routes"));
app.use("/api/v1/wishlist", require("./modules/wishlist/wishlist.routes"));

// Error Handler
app.use(errorHandler);

module.exports = app;
