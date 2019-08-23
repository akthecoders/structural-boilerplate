process.env.NODE_ENV == 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
// Configure Chai
chai.use(chaiHttp);
chai.should();
const app = require('../index');

describe('/api/auth Authentication Routes', () => {
  it('POST should authenticate user via valid credentials', done => {
    let registerUserData = {
      email: 'test@test.com',
      password: 'password'
    };
    chai
      .request(app)
      .post('/api/auth')
      .send(registerUserData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('POST should not authenticate user via invalid credentials', done => {
    let registerUserData = {
      email: 'wrong@wrong.wrong',
      password: 'password'
    };

    chai
      .request(app)
      .post('/api/auth')
      .send(registerUserData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
