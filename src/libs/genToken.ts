import jwt from 'jsonwebtoken';
import { userInfo } from './auth';

interface tokenInput extends userInfo {
  type: 'access' | 'refresh';
}

const genToken = (userInfo: tokenInput): string => {
  const { type } = userInfo;
  let SECRET: string = '';
  if (type === 'access') {
    SECRET = process.env.SECRET_ACCESS!;
  } else {
    SECRET = process.env.SECRET_REFRESH!;
  }
  return jwt.sign({ ...userInfo }, SECRET, { expiresIn: type === 'access' ? '15m' : '1d' });
};

export default genToken;
