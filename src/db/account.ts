import { Account } from './schema/account.model';

interface accountInterface {
  userName: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
}

export const accountAdd = (params: accountInterface) => {
  const { userName, password, email, phoneNumber } = params;
  try {
    const user = new Account({
      userName,
      password,
      email,
      phoneNumber,
      tokenVersion: 0,
      avatar: '',
      setting: {},
    });
    user.save();
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const accountFind = async (userName: string) => {
  try {
    const foundAccount = await Account.findOne({
      userName,
    });
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
