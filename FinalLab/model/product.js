const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  color: String,
  price: Number,
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
