var express = require('express');
var router = express.Router();

const db = require("../models");
const Ads = db.advertisments;


const adsController = require("../controllers/advertismentsCustomer");


 
   router.get('/:id',adsController.getAdByid);

   //  router.get('/:title',adsController.getAdByTitle);



module.exports = router;
