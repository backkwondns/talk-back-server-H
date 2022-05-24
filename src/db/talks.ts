import Talks from './schema/talk.model';
import { talksInterface } from '../interface';
import Account from './schema/account.model';
import mongoose from 'mongoose';

export const talkSend = async (talkID: string, userName: string[], talk: talksInterface.talkInterface) => {
  try {
    userName.sort();
    const newTalkID = new mongoose.Types.ObjectId();

    await Talks.updateOne(
      {
        _id: talkID,
      },
      {
        userName: userName,
        $push: {
          talk: {
            $each: [{ _id: newTalkID, from: talk.from, content: talk.content }],
            $position: 0,
          },
        },
        lastContent: talk.content,
      },
      { new: true, upsert: true },
      (error, writeOpResult) => {
        if (writeOpResult.upsertedId !== null) {
          userName.forEach(async (name) => {
            await Account.updateOne(
              { userName: name },
              { $addToSet: { 'talksList.roomID': writeOpResult.upsertedId, 'talksList.talkID': '' } },
            );
          });
        }
      },
    ).clone; // ()로 실행 메소드 실행시 updateOne이 실행되어 중복으로 쿼리실행

    return String(newTalkID);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

// export const talkRead = async (talkID: string, )

export const talkDetail = async (talkID: string, from: number, to: number) => {
  try {
    const id = new mongoose.Types.ObjectId(talkID);
    return Talks.aggregate([
      { $match: { _id: id } },
      { $project: { id: '$_id', talk: { $slice: ['$talk', from, to] }, talkCount: { $size: '$talk' } } },
    ]).then((value) => value[0]);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const talkAllGet = async (userName: string) => {
  try {
    const talksList = await Talks.find({ userName }, '-talk').sort({ updatedAt: -1 });
    talksList.forEach((values, index) => {
      talksList[index].userName = values.userName.filter((name: string) => userName !== name);
    });
    return talksList;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const talkFindFriend = async (userName: string[]) => {
  try {
    userName.sort();
    const result = await Talks.findOne({ userName });
    if (result) return result;
    else {
      const talk = new Talks({
        userName,
      });
      talk.save();
      talk.talkCount = 0;
      return talk;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
