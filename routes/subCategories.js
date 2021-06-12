var express = require('express');
var router = express.Router();

const db = require("../models");
const subcategory = db.subCategories;

const subcategoryController = require("../controllers/subCategoriesCo");
 router.post("/edit",subcategoryController.updatesubCategoryByName);
router.post("/add",subcategoryController.createsubCategory);
router.delete("/remove",subcategoryController.deletesubCategoryByName);



module.exports = router;