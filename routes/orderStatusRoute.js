var express = require('express');
var router = express.Router();

const orderStatus = require("../controllers/orderStatus.js");




router.put('/updateStatus', orderStatus.updateOrderStatus);

module.exports = router;