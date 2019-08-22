const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const UserApi = require('./DataSources/User');
const AuthApi = require('./DataSources/Auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      userApi: new UserApi(),
      authApi: new AuthApi()
    };
  },
  context: ({ req }) => {
    const token = req.headers.token || '';
    return {
      token
    };
  }
});

// Start the Server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
