import Account from './schema/account.model';
import Friend from './schema/friend.model';

interface accountInterface {
  userName: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  avatar?: string;
  statusMessage?: string;
}

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
export const accountAdd = (params: accountInterface) => {
  const { userName, password, email, phoneNumber } = params;
  try {
    const user = new Account({
      userName,
      password,
      email,
      phoneNumber,
      tokenVersion: 0,
      setting: { avatar: '', statusMessage: '', mode: 'light' },
    });
    user.save();
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
