var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const isAdmin = require('./middleware/isAdmin');
const isCustomer = require('./middleware/isCustomer');
const auth = require('./middleware/auth');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cartsRouter=require('./routes/carts');
var ordersRouter=require('./routes/orders');
var orderStatus=require('./routes/orderStatusRoute');
var salesRouter = require('./routes/sales');
var salesCustomerRouter = require('./routes/salesCustomer');
var adsCustomerRouter = require('./routes/advertismentsCustomer');

var adsRouter = require('./routes/advertisments');
////////////////////////////////////////////////////////////////////Sale Route
//var salesRouter = require('./routes/sales');
var authRouter = require('./routes/auth');
var addressRouter = require('./routes/address');
var catRouter = require('./routes/categories');
var subCategoriesRouter = require('./routes/subCategories');
 var categoriesRouter = require('./routes/catego');

var adminProductRouter = require('./routes/adminProduct');
var customerProductRouter = require('./routes/customerProduct');
//////////////////////////////////////////////////////////////////////////
require('crypto').randomBytes(60, function(err, buffer) {
  var token = buffer.toString('hex');
  console.log(token);
 });
var app = express();
// connect to database
const db = require("./models");
const { categories } = require('./models');

db.sequelize.sync();
db.sequelize.sync({ alert: true });



var loadenv = require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cart',isCustomer, cartsRouter);
app.use('/order',isCustomer, ordersRouter);
app.use('/orders',isAdmin, orderStatus);
app.use('/users',isAdmin, usersRouter);

app.use('/auth', authRouter);

app.use('/address',isCustomer, addressRouter);
app.use('/search', isAdmin, adminProductRouter);
 app.use('/Srch', customerProductRouter);
 app.use('/categories', catRouter);

 app.use('/sale',isAdmin, salesRouter);
app.use('/saleCustomer',isCustomer, salesCustomerRouter);
app.use('/adsCustomer',isCustomer, adsCustomerRouter);

app.use('/subcategories',isAdmin, subCategoriesRouter);
// ////////////////////////////////////////////////////////////////////Sale Route

 app.use('/categories', isAdmin,categoriesRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
