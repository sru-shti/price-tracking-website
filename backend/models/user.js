// /models/user.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  trackedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Price' }]
});
module.exports = mongoose.model('User', UserSchema);
