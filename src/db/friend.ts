import Friend from './schema/friend.model';
import Account from './schema/account.model';

export const friendAdd = async (userName: string, friend: string) => {
  try {
    await Friend.updateOne({ userName }, { $addToSet: { friends: { userName: friend } } });
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const friendFind = async (userName: string) => {
  try {
    let { friends } = await Friend.findOne({
      userName,
    });
    friends.sort(function (a: any, b: any) {
      if (a.userName > b.userName) {
        return 1;
      }
      if (a.userName < b.userName) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    for (const value of friends) {
      const index: number = friends.indexOf(value);
      friends[index] = await Account.findOne(
        { userName: value.userName },
        '-_id userName email phoneNumber setting.avatar setting.statusMessage',
      );
    }
    return friends;
  } catch (error: any) {
    return error;
  }
};

export const friendSearch = async (method: string, value: string, userName: string) => {
  let query: any = {};
  query[method] = value;
  try {
    const friend = await Account.findOne(query, '-_id userName email phoneNumber setting.avatar setting.statusMessage');
    const { friends } = await Friend.findOne({
      userName,
    });
    const alreadyFriend = friends.find((value: any) => {
      return value.userName === friend.userName;
    });
    if (alreadyFriend) {
      friend['friend'] = true;
      return friend;
    } else {
      friend['friend'] = false;
      return friend;
    }
  } catch (error) {
    return error;
  }
};
export const friendDelete = async (userName: string) => {
  try {
    const user = await Friend.deleteOne({
      userName,
    });
    return user;
  } catch (error: any) {
    return error;
  }
};
