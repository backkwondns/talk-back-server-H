import { accountAdd, accountDelete, accountFind, accountTokenVersionInc } from '../../db/account';
import { GraphQLDateTime } from 'graphql-iso-date';
import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-express';
import { createAccessToken, createRefreshToken } from '../../libs/auth';
import { isAuth } from '../../libs/isAuth';
import { sendRefreshToken } from '../../libs/sendRefreshToken';

export const accountResolvers = {
  timeStamp: GraphQLDateTime,
  Query: {
    userFind: (_: any, { userName }: { userName: string }, context: any) => {
      isAuth(context);
      return accountFind(userName);
    },
  },
  Mutation: {
    revokeRefreshTokenForUser: async (_: any, { userName }: { userName: string }, context: any) => {
      try {
        await accountTokenVersionInc(userName);
        return true;
      } catch {
        return false;
      }
    },

    login: async (_: any, { userName, password }: Record<string, string>, context: any) => {
      const user = await accountFind(userName);
      if (!user) {
        throw new UserInputError('Wrong Credentials!', {
          error: { userName: 'Wrong Credentials!' },
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new UserInputError('Wrong Credentials!', {
          error: { password: 'Wrong Credentials!' },
        });
      }
      sendRefreshToken(
        context.res,
        createRefreshToken({
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          tokenVersion: user.tokenVersion,
        }),
      );
      return {
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        accessToken: createAccessToken({ userName: user.userName, email: user.email, phoneNumber: user.phoneNumber }),
      };
    },

    logout: async (_: any, args: any, context: any) => {
      sendRefreshToken(context.res, '');
      return true;
    },

    register: async (_: any, { userName, password, email, phoneNumber }: Record<string, string>) => {
      console.log(userName);
      const alreadyExist = await accountFind(userName);
      if (alreadyExist) {
        throw new UserInputError('Already exist UserName!', {
          error: { userName: 'Already Exist UserName' },
        });
      } else {
        password = await bcrypt.hash(password, 10);
        try {
          return accountAdd({ userName, password, email, phoneNumber });
        } catch (error) {
          return error;
        }
      }
    },
    userDelete: (_: any, { userName }: Record<string, string>) => {
      accountDelete(userName);
      return 'done';
    },
  },
};
