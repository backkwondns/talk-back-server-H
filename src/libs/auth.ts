import genToken from './genToken';

export interface userInfo {
  userName: string;
  email: string;
  phoneNumber: string;
  tokenVersion?: number;
}

export const createAccessToken = (userInfo: userInfo) => {
  return genToken({ type: 'access', ...userInfo });
};

export const createRefreshToken = (userInfo: userInfo) => {
  return genToken({ type: 'refresh', ...userInfo });
};
