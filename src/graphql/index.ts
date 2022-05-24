import { accountTypes } from './account/account.schema';
import { accountResolvers } from './account/account.resolvers';
import { friendTypes } from './friend/friend.schema';
import { friendResolvers } from './friend/friend.resolvers';
import { talksTypes } from './talks/talks.schema';
import { talksResolvers } from './talks/talks.resolvers';

export const typeDefs = [accountTypes, friendTypes, talksTypes];
export const resolvers = [accountResolvers, friendResolvers, talksResolvers];
