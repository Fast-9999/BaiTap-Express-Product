var express = require('express');
var router = express.Router();
var ProductModel = require('../models/product'); // Gọi cái file model mới tạo ở Bước 2

/* GET lấy danh sách sản phẩm từ MongoDB */
router.get('/', async function(req, res, next) {
  try {
    const { title, minPrice, maxPrice, slug } = req.query;
    
    // Tạo lồng lọc dữ liệu
    let condition = {};

    // 1. Lọc theo tên (tìm gần đúng)
    if (title) {
      condition.title = { $regex: title, $options: 'i' };
    }

    // 2. Lọc theo giá
    if (minPrice || maxPrice) {
      condition.price = {};
      if (minPrice) condition.price.$gte = Number(minPrice);
      if (maxPrice) condition.price.$lte = Number(maxPrice);
    }

    // 3. Lọc theo slug (chính xác)
    if (slug) {
      condition.slug = slug;
    }

    // Gọi lệnh tìm kiếm trong MongoDB
    const products = await ProductModel.find(condition);

    res.json({
      message: 'Lấy danh sách thành công',
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET chi tiết 1 sản phẩm theo id */
router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    const product = await ProductModel.findOne({ id: Number(id) });

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json({
      message: 'Lấy chi tiết thành công',
      data: product
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;