import { GraphQLDateTime } from 'graphql-iso-date';
import { friendAdd, friendFind, friendSearch } from '../../db/friend';

export const friendResolvers = {
  timeStamp: GraphQLDateTime,
  Query: {
    findFriend: async (_: any, { userName }: { userName: string }) => {
      try {
        const friends = await friendFind(userName);
        return friends;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    searchFriend: async (_: any, { method, value, userName }: { method: string; value: string; userName: string }) => {
      const friend = await friendSearch(method, value, userName);
      try {
        return friend;
      } catch (error) {
        return error;
      }
    },
    addFriend: async (_: any, { userName, friend }: { userName: string; friend: string }) => {
      try {
        const result = await friendAdd(userName, friend);
        return result;
      } catch (error) {
        return error;
      }
    },
  },
};
