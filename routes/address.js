var express = require('express');
var router = express.Router();
const addressContorller = require("../controllers/address");

router.get("/userAddress",addressContorller.getaddressByID);
router.post("/address",addressContorller.createAddress);
router.delete("/address", addressContorller.deleteaddressByuserID);
router.put("/address", addressContorller.updateAddressByuserId);

module.exports = router;
