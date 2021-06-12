var express = require('express');
var router = express.Router();

const db = require("../models");
const Category = db.categories;

const searchController = require("../controllers/ProductsCustomerControlle");
router.get("/ProductsSearch",searchController.getAllProductsbySearch);
router.get("/Products",searchController.getAllAvaliabeProducts);

module.exports = router;