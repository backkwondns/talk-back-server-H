import { gql } from 'apollo-server-express';

export const accountTypes = gql`
  scalar timeStamp
  type Query {
    userFind(userName: String!): userType!
  }

  type Mutation {
    login(userName: String!, password: String): userLogin
    logout: Boolean
    registerMock(
      userName: String!
      password: String!
      email: String!
      phoneNumber: String!
      setting: settingInput
    ): Boolean
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
    setting: setting
  }

  type setting {
    avatar: String
    statusMessage: String
    mode: String
  }

  input settingInput {
    avatar: String
    statusMessage: String
    mode: String
  }
  type userType {
    userName: String!
    email: String!
    phoneNumber: String!
    tokenVersion: Int!
    createdAt: timeStamp
  }
`;
