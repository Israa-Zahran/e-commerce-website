var express = require('express');
var router = express.Router();

const db = require("../models");
const Category = db.categories;

const categoryController = require("../controllers/categoriesCo");
router.post("/edit",categoryController.updateCategoryByName);
router.post("/add",categoryController.createCategory);
router.delete("/remove",categoryController.deleteCategoryByName);


module.exports = router;