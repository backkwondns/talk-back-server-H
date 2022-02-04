import { accountTypes } from './account/account.schema';
import { accountResolvers } from './account/account.resolvers';
import { friendTypes } from './friend/friend.schema';
import { friendResolvers } from './friend/friend.resolvers';

export const typeDefs = [accountTypes, friendTypes];
export const resolvers = [accountResolvers, friendResolvers];
