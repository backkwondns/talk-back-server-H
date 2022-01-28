import { gql } from 'apollo-server-express';

export const friendTypes = gql`
  scalar timeStamp
  type Query {
    findFriend(userName: String!): [friendType]
  }
  type Mutation {
    searchFriend(method: String!, value: String!, userName: String!): friendType
    addFriend(userName: String!, friend: String!): Boolean
  }

  type friendType {
    userName: String!
    email: String!
    phoneNumber: String!
    setting: settingType
    friend: Boolean
  }

  type settingType {
    avatar: String
    statusMessage: String
  }
`;
