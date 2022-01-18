import { accountAdd, accountDelete, accountFind } from '../db/account';
import { GraphQLDateTime } from 'graphql-iso-date';

export const resolvers = {
  timeStamp: GraphQLDateTime,
  Query: {
    userFind: async (_: any, { userName }: Record<string, string>) => {
      return await accountFind(userName);
    },
  },
  Mutation: {
    userAdd: (_: any, args: any) => {
      return accountAdd(args.userInfo);
    },
    userDelete: (_: any, { userName }: Record<string, string>) => {
      return accountDelete(userName);
    },
  },
};
