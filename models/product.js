const mongoose = require('mongoose');

// Quy định cấu trúc cho bảng sản phẩm
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  slug: String
});

module.exports = mongoose.model('Product', productSchema);