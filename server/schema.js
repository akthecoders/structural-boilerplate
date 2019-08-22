const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
  }
  type Token {
    token: String
  }
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Token
    registerUser(name: String!, email: String!, password: String!): Token
  }
`;

module.exports = typeDefs;
