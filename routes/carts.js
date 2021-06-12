var express = require('express');
var router = express.Router();

const cartController = require("../controllers/cart.js");

router.get('/viewproductsincart', cartController.viewproductsincart);


router.post('/addproductstocart', cartController.addproducttocart);
router.delete('/deleteProducts', cartController.deleteAllProductsInCart);
router.delete('/deleteProduct', cartController.deleteproductfromcart);




module.exports = router;