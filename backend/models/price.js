const mongoose = require('mongoose');
const PriceSchema = new mongoose.Schema({
  productId: String,
  name: String,
  imageUrl: String,
  platform: String,
  price: Number,
  date: { type: Date, default: Date.now },
  inStock: Boolean,
  saleEvent: String,
  history: [{ price: Number, timestamp: Date }]
}, { timestamps: true });


module.exports = mongoose.model('Price', PriceSchema);
