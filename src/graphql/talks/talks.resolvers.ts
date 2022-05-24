import { GraphQLDateTime } from 'graphql-iso-date';
import { talksInterface } from '../../interface';
import { talkSend, talkDetail, talkAllGet, talkFindFriend } from '../../db/talks';
import { accountAvatar, readUpdate } from '../../db/account';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
export const talksResolvers = {
  timeStamp: GraphQLDateTime,
  Query: {
    getAllTalk: async (_: any, { userName }: { userName: string }) => {
      try {
        const talksList = await talkAllGet(userName);
        for (const index in talksList) {
          const avatar: string[] = [];
          await (async () => {
            for (const user of talksList[index].userName) {
              const result = await accountAvatar(user);
              avatar.push(result);
            }
          })();
          talksList[index].avatar = avatar;
        }
        return talksList;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    findFriendTalk: async (_: any, { userName }: { userName: string[] }) => {
      try {
        return await talkFindFriend(userName);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    detailTalk: async (_: any, { talkID, from, to }: { talkID: string; from: number; to: number }) => {
      try {
        return await talkDetail(talkID, from, to);
      } catch (error: any) {
        throw new Error(error);
      }
    },

    sendTalk: async (
      _: any,
      { talkID, userName, talk }: { talkID: string; userName: string[]; talk: talksInterface.talkInterface },
    ) => {
      try {
        const newTalkID = await talkSend(talkID, userName, talk);
        const publishPayload = {
          newTalk: {
            id: talkID,
            userName,
            talk: {
              ...talk,
              _id: newTalkID,
              timeStamp: new Date(),
            },
          },
        };
        await pubsub.publish(talkID, publishPayload);
      } catch (error: any) {
        throw new Error(error);
      }
    },

    updateRead: async (_: any, { userName, roomID, talkID }: { userName: string; roomID: string; talkID: string }) => {
      try {
        await readUpdate(userName, roomID, talkID);
        return true;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  Subscription: {
    newTalk: {
      subscribe: (_: any, { talkID }: { talkID: string[] }) => {
        return pubsub.asyncIterator(talkID);
      },
    },
  },
};
