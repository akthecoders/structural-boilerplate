const { validationResult } = require('express-validator');

class Controller {
  validateRequest(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw res.status(400).json({ errors: errors.array() });
    }
  }
}

module.exports = Controller;
