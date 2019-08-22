const { RESTDataSource } = require('apollo-datasource-rest');

class Auth extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/api/auth';
  }

  willSendRequest(request) {
    request.headers.set('x-auth-token', this.context.token);
  }

  async tryLogin({ email, password }) {
    return this.post('/', { email, password });
  }

  async getLoggedInUserDetails() {
    return this.get('/');
  }
}

module.exports = Auth;
