var express = require('express');
var router = express.Router();

const db = require("../models");
const Sale = db.sales;


const saleController = require("../controllers/sales");

  router.get('/date/:id', saleController.getSaleByDate);

router.post('/sales', saleController.createSale);
router.delete('/sales/:id', saleController.deleteSale);
router.put('/update/:id', saleController.updateSale);
router.get('/:id', saleController.getSaleByid);




module.exports = router;
