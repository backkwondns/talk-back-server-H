import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const isAuth = (context: any) => {
  const authorization = context.req.headers.authorization;
  if (!authorization) {
    throw new Error('Authentication token must be provided');
  }
  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET_ACCESS!);
    context.payload = payload as any;
  } catch (error: any) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};
