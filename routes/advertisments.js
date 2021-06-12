var express = require('express');
var router = express.Router();

const db = require("../models");
const Ads = db.advertisments;


const adsController = require("../controllers/advertisments");


 router.post('/create', adsController.createAd);
  router.delete('/del/:id', adsController.deleteAds);
   router.put('/update/:is', adsController.updateAd);
 
   //  router.get('/:title',adsController.getAdByTitle);



module.exports = router;
