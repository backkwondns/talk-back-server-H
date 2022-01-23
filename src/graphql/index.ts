import { accountTypes } from './account/account.schema';
import { accountResolvers } from './account/account.resolvers';

export const typeDefs = [accountTypes];
export const resolvers = [accountResolvers];
