var express = require('express');
var router = express.Router();

const db = require("../models");

const categorySubcategoryController = require("../controllers/categorySubcategory");

router.get("/allCategory",categorySubcategoryController.getAllCategory);
router.get("/allsubCategory",categorySubcategoryController.getAllsubCategory);
module.exports = router;
