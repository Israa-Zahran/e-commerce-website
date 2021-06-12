var express = require('express');
var router = express.Router();
const usersController = require("../controllers/user");
router.post('/admin', usersController.addAdmin);

router.get('/allUser', usersController.getAllUsers);
router.get('/statistics', usersController.getstatistics);

router.delete('/userDel/:id', usersController.deleteUserByuAdmin);


module.exports = router;
