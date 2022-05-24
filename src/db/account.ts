import { accountInterface } from '../interface';
import Account from './schema/account.model';
import Friend from './schema/friend.model';

export const accountAddMock = (params: {
  password: string;
  phoneNumber: string;
  userName: string;
  email: string;
  setting: { avatar: string; statusMessage: string };
}) => {
  const { userName, password, email, phoneNumber, setting } = params;
  try {
    const user = new Account({
      userName,
      password,
      email,
      phoneNumber,
      tokenVersion: 0,
      setting: {
        ...setting,
        theme: 'light',
      },
      talksList: [],
    });
    user.save();
    const friends = new Friend({
      userName,
      friends: [],
    });
    friends.save();
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const accountAdd = (params: accountInterface.accountAddInterface) => {
  const { userName, password, email, phoneNumber } = params;
  try {
    const user = new Account({
      userName,
      password,
      email,
      phoneNumber,
    });
    user.save();
    const friends = new Friend({
      userName,
      friends: [],
    });
    friends.save();
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const accountFind = async (userName: string) => {
  try {
    const foundAccount = await Account.findOne(
      {
        userName,
      },
      '-_id',
    );
    return foundAccount;
  } catch (error: any) {
    return error;
  }
};

export const checkDuplicate = async (userName: string, email: string, phoneNumber: string) => {
  try {
    return await Account.findOne({ $or: [{ userName }, { email }, { phoneNumber }] });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const accountAvatar = async (userName: string) => {
  try {
    const foundAccount = await Account.findOne(
      {
        userName,
      },
      'setting.avatar',
    );
    return foundAccount.setting.avatar;
  } catch (error: any) {
    return error;
  }
};

export const accountDelete = async (userName: string) => {
  try {
    const user = await Account.deleteOne({
      userName,
    });
    return user;
  } catch (error: any) {
    return error;
  }
};

export const accountTokenVersionInc = async (userName: string) => {
  try {
    const result = await Account.updateOne({ userName }, { $inc: { tokenVersion: 1 } });
    return result;
  } catch (error) {
    return error;
  }
};

export const readUpdate = async (userName: string, roomID: string, talkID: string) => {
  try {
    await Account.updateOne({ userName, 'talksList.roomID': roomID }, { 'talksList.talkID': talkID });
  } catch (error: any) {
    throw new Error(error);
  }
};
