const { RESTDataSource } = require('apollo-datasource-rest');

class User extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/api/user';
  }

  willSendRequest(request) {
    request.headers.set('x-auth-token', this.context.token);
  }

  async tryRegisteringUser({ name, email, password }) {
    return this.post('/', { name, email, password });
  }
}

module.exports = User;
