var express = require('express');
var router = express.Router();

const db = require("../models");

const searchAdminController = require("../controllers/productControllerAdmin");
router.get("/ProductsSearch",searchAdminController.getAllProductsbySearch);
router.get("/allProducts",searchAdminController.getAllProducts);
router.post("/edit",searchAdminController.updateProductByName);
router.post("/add",searchAdminController.createProduct);
router.delete("/remove",searchAdminController.deleteProductByName);

module.exports = router;