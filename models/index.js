require('dotenv').config();

const Sequelize = require("sequelize");
// const category = require('./category.js');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.addresses = require("./address.js")(sequelize, Sequelize); //add this line
db.advertisments = require("./advertisment.js")(sequelize, Sequelize); //add this line
db.carts = require("./cart.js")(sequelize, Sequelize); //add this line
db.categories = require("./category.js")(sequelize, Sequelize); //add this line
db.images = require("./image.js")(sequelize, Sequelize); //add this line
db.orders = require("./order.js")(sequelize, Sequelize);
db.orderDetails = require("./orderDetail.js")(sequelize, Sequelize); //add this line
db.products = require("./product.js")(sequelize, Sequelize); //add this line
db.sales = require("./sale.js")(sequelize, Sequelize); //add this line
db.subCategories = require("./subCategory.js")(sequelize, Sequelize); //add this line
db.users = require("./user.js")(sequelize, Sequelize); //add this line



//Address associations 
// 1-*//
db.addresses.belongsTo(db.users, { foreignKey: 'user_id' });
db.users.hasOne(db.addresses, { foreignKey: 'user_id' });

//Advertisments associations 

//1-* add belong to many user
db.users.hasMany(db.advertisments, { foreignKey: 'user_id' });
db.advertisments.belongsTo(db.users, { foreignKey: 'user_id' });

//Cart associations 
1.1
db.users.hasMany(db.carts, { foreignKey: 'user_id' });
db.carts.belongsTo(db.users, { foreignKey: 'user_id' });//for carts


//order associations 

//user has many orders 1-*
db.users.hasMany(db.orders, { foreignKey: 'user_id' });
db.orders.belongsTo(db.users, { foreignKey: 'user_id' });

//orderDetails associations 

// 1-has many details
db.orders.hasOne(db.orderDetails, { foreignKey: 'order_id' });//has many
db.orderDetails.belongsTo(db.orders, { foreignKey: 'order_id' });
//1-1 cart has one orderdetail

db.carts.hasOne(db.orderDetails, { foreignKey: 'cart_id' });
db.orderDetails.belongsTo(db.carts, { foreignKey: 'cart_id' });//wrong


// Products Table  
// cart has many products 1-many  
0.*
db.carts.hasMany(db.products, { foreignKey: 'cart_id' });
db.products.belongsTo(db.carts, { foreignKey: 'cart_id' });//not nassasry

db.subCategories.hasMany(db.products, { foreignKey: 'subcategory_id' });
db.products.belongsTo(db.subCategories, { foreignKey: 'subcategory_id' });
/////////////////
/** Sale table */

///////////
//subCategories table
db.categories.hasMany(db.subCategories, { foreignKey: 'category_id' })
db.subCategories.belongsTo(db.categories, { foreignKey: 'category_id' });

//////






module.exports = db;
