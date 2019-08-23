const JWT = require('../controllers/Jwt');
const JWTObj = new JWT();

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decode = JWTObj.verifyToken(token);
    req.user = decode.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
