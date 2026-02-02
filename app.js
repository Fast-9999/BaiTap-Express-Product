var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // <--- [MỚI] 1. Gọi thư viện Mongoose

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); 

// <--- [MỚI] 2. Đoạn code kết nối Database
// Lưu ý: Đảm bảo ông đã tạo database tên 'BaiTapStore' bên MongoDB Compass
mongoose.connect('mongodb://127.0.0.1:27017/BaiTapStore')
  .then(() => console.log('>>>> Kết nối MongoDB thành công!'))
  .catch(err => console.error('>>>> Lỗi kết nối:', err));
// ---------------------------------------------------------------

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); 

module.exports = app;