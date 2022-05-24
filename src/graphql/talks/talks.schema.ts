import { gql } from 'apollo-server-express';

export const talksTypes = gql`
  scalar timeStamp
  type Query {
    getAllTalk(userName: String): [talksList]
    findFriendTalk(userName: [String]): detailTalk
  }

  type Mutation {
    sendTalk(talkID: String, userName: [String], talk: talkInput): Boolean
    updateRead(userName: String, roomID: String, talkID: String): Boolean
    detailTalk(talkID: String, from: Int, to: Int): detailTalk
  }

  type Subscription {
    newTalk(talkID: [String]): subscribeTalk
    numberIncremented: String
  }

  type a {
    from: String
    content: String
  }
  type talk {
    _id: String
    from: String
    content: String
    timeStamp: timeStamp
  }

  input talkInput {
    from: String
    content: String
  }

  type detailTalk {
    id: String
    userName: [String]
    talk: [talk]
    talkCount: Int
  }

  type subscribeTalk {
    id: String
    userName: [String]
    talk: talk
  }

  type talksList {
    id: String
    userName: [String]
    lastContent: String
    updatedAt: timeStamp
    avatar: [String]
  }
`;
