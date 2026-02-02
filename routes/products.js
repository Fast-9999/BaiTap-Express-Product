var express = require('express');
var router = express.Router();

// Giả lập dữ liệu (Database)
// Trong thực tế đoạn này sẽ là Model gọi xuống DB
const products = [
  { id: 1, title: 'Laptop Gaming Asus', price: 1500, slug: 'laptop-gaming-asus' },
  { id: 2, title: 'Iphone 15 Pro Max', price: 1200, slug: 'iphone-15-pro-max' },
  { id: 3, title: 'Samsung Galaxy S24', price: 1000, slug: 'samsung-galaxy-s24' },
  { id: 4, title: 'Chuột Logitech', price: 50, slug: 'chuot-logitech' },
  { id: 5, title: 'Bàn phím cơ', price: 100, slug: 'ban-phim-co' }
];

/* GET products listing với các Query Filter */
// URL test: /products?title=lap&minPrice=1000&maxPrice=2000
router.get('/', function(req, res, next) {
  // Lấy các tham số từ query string
  const { title, minPrice, maxPrice, slug } = req.query;

  // Copy mảng gốc ra để xử lý filter
  let result = [...products];

  // 1. Filter theo Title (Includes - không phân biệt hoa thường)
  if (title) {
    result = result.filter(product => 
      product.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // 2. Filter theo Min Price (>=)
  if (minPrice) {
    result = result.filter(product => product.price >= parseFloat(minPrice));
  }

  // 3. Filter theo Max Price (<=)
  if (maxPrice) {
    result = result.filter(product => product.price <= parseFloat(maxPrice));
  }

  // 4. Filter theo Slug (Equal - so sánh bằng tuyệt đối)
  if (slug) {
    result = result.filter(product => product.slug === slug);
  }

  // Trả về kết quả
  res.json({
    message: 'Lấy danh sách sản phẩm thành công',
    count: result.length,
    data: result
  });
});

/* GET product detail by ID */
// URL test: /products/2
router.get('/:id', function(req, res, next) {
  const { id } = req.params;

  // Tìm sản phẩm (lưu ý ép kiểu id sang số nếu id trong DB là số)
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({
      message: 'Không tìm thấy sản phẩm'
    });
  }

  res.json({
    message: 'Lấy chi tiết sản phẩm thành công',
    data: product
  });
});

module.exports = router;