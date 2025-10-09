const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  productId: String,
  platform: String, // flipkart or amazon
  price: Number,
  date: { type: Date, default: Date.now },
  inStock: Boolean,
  saleEvent: String
});

module.exports = mongoose.model('Price', PriceSchema);
