const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
app.use(express.json());

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const invoices = require("./routes/invoices.route");

app.use("/api", products);
app.use("/api", auth);
app.use("/api", invoices);
app.use(errorMiddleware);
module.exports = app;
