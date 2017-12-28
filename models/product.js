const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
