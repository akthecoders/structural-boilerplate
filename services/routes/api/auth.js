const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const Auth = require('../../controllers/Auth');
const authObj = new Auth();

//  @route  GET api/auth
//  @desc   Get user data via token
//  @access Private
router.get('/', auth, authObj.getUserDetailsViaToken);

//  @route  /api/auth
//  @desc   Authencticate user & get token.
//  @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authObj.validateUserAndGenerateToken
);

module.exports = router;
