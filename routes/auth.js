var express = require('express');
const {check, validationResult} = require('express-validator/check');
var router = express.Router();
const usersController = require("../controllers/user");
const bcrypt = require("bcrypt");
/* GET users listing. */

router.get('/logout', usersController.logout);
router.get('/view-profile', usersController.getuserByID);


router.post('/signup', [
    check('first_name').not().isEmpty().withMessage('first_name cannot be empty'),
    check('last_name').not().isEmpty().withMessage('last_name cannot be empty'),
    check('email').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('your email is invalid'),
    check('mobile').matches(/^\d+$/).withMessage('must contain a numbers only'),
    check('password').matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)
    .withMessage('must contain at least 8 chars, a combination of letters and numbers')
  ], usersController.signUp);
  router.post('/signin', usersController.signIn);
 
  router.post('/password', [
      check('password').matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/)
      .withMessage('must contain at least 8 chars, a combination of letters and numbers')],
      usersController.change_password);
      

router.put("/profile", usersController.editProfile);
module.exports = router;