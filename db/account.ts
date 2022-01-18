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
    });
    return user.save();
  } catch (error: any | unknown) {
    return error;
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
