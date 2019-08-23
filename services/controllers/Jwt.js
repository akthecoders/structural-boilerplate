const jwtToken = require('jsonwebtoken');
const config = require('config');

class jwt {
  verifyToken(token) {
    try {
      return jwtToken.verify(token, config.get('jwtSecret'));
    } catch (error) {
      throw { message: 'Invalid Token' };
    }
  }

  sign(payload) {
    return jwtToken.sign(payload, config.get('jwtSecret'), {
      expiresIn: 360000
    });
  }
}

module.exports = jwt;
