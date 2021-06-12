var express = require('express');
var router = express.Router();

const orderController = require("../controllers/order.js");

router.get('/getOrders', orderController.getOrders);
router.post('/postOrder', orderController.postOrders);




module.exports = router;