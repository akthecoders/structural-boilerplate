const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const User = require('../../controllers/User');
const userObj = new User();
// @route    POST api/user
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').exists(),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
  ],
  userObj.registerUser
);

module.exports = router;
