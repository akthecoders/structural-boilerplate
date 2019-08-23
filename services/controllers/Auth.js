const bcrypt = require('bcrypt');
const User = require('../models/User');
const Controller = require('./Controller');
const JWT = require('./Jwt');
const JWTObj = new JWT();

class Auth extends Controller {
  async validateUserAndGenerateToken(req, res) {
    try {
      super.validateRequest(req, res);
    } catch (error) {
      return error;
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      res.json({
        token: JWTObj.sign({
          user: {
            id: user.id
          }
        })
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }

  async getUserDetailsViaToken(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = Auth;
