import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar timeStamp

  type Query {
    userFind(userName: String): userInfo
  }
  type Mutation {
    userAdd(userInfo: userInput!): userInfo
    userDelete(userName: String!): userInfo
  }

  type userInfo {
    userName: String
    password: String
    email: String
    phoneNumber: String
    createdAt: timeStamp
    updatedAt: timeStamp
  }
  input userInput {
    userName: String
    password: String
    email: String
    phoneNumber: String
  }
`;
