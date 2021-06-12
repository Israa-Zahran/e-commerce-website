var express = require('express');
var router = express.Router();

const db = require("../models");
const Sale = db.sales;


const saleController = require("../controllers/salesCustomer");

  // router.get('/date/:id', saleController.getSaleByDate);

 
router.get('/:id', saleController.getSaleByid);




module.exports = router;
