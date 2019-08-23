const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const Controller = require('./Controller');
const JWT = require('./Jwt');
const JWTObj = new JWT();

class User extends Controller {
  async registerUser(req, res) {
    try {
      super.validateRequest(req, res);
    } catch (error) {
      return error;
    }

    const { name, email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new UserModel({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json({
        token: JWTObj.sign({
          user: {
            id: user.id
          }
        })
      });
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
}

module.exports = User;
