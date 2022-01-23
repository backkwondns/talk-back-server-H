import { gql } from 'apollo-server-express';

export const accountTypes = gql`
  scalar timeStamp
  type Query {
    userFind(userName: String!): userType!
  }

  type Mutation {
    login(userName: String!, password: String): userLogin
    logout: Boolean
    register(userName: String!, password: String!, email: String!, phoneNumber: String!): Boolean
    userDelete(userName: String!): String
    revokeRefreshTokenForUser(userName: String!): Boolean
  }

  type userLogin {
    userName: String!
    email: String!
    phoneNumber: String!
    accessToken: String
    tokenVersion: Int
  }

  type userType {
    userName: String!
    email: String!
    phoneNumber: String!
    tokenVersion: Int!
    createdAt: timeStamp
  }
`;
