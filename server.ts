import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { typeDefs } from './src/graphql';
import { resolvers } from './src/graphql';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import express from 'express';
import morgan from 'morgan';

import dotenv from 'dotenv';
import { accountFind } from './src/db/account';
import { createAccessToken, createRefreshToken } from './src/libs/auth';
import { sendRefreshToken } from './src/libs/sendRefreshToken';
import cors from 'cors';
dotenv.config();

import mockRouter from './src/router/mock.router';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscribe } from 'graphql';
import { execute } from 'graphql';

const mongoServer = process.env.MONGO_SERVER!;
mongoose.connect(mongoServer, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB connected!');
  }
});

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(cors({ origin: ['http://localhost:3000', 'http://192.168.0.40:3000'], credentials: true }));
  app.use('/mock', mockRouter);
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.send({ ok: false, message: 'no token', accessToken: '' });
    }
    let payload: any = null;
    try {
      payload = jwt.verify(token, process.env.SECRET_REFRESH!);
    } catch (error) {
      return res.send({ ok: false, message: 'invalid token', accessToken: '' });
    }
    const user = await accountFind(payload.userName);
    if (!user) {
      return res.send({ ok: false, message: 'not matched user', accessToken: '' });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, message: 'tokenVersion is Wrong', accessToken: '' });
    }
    sendRefreshToken(
      res,
      createRefreshToken({
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        tokenVersion: user.tokenVersion,
      }),
    );
    return res.send({
      ok: true,
      accessToken: createAccessToken({ userName: user.userName, email: user.email, phoneNumber: user.phoneNumber }),
      userInfo: { userName: user.userName, email: user.email, phoneNumber: user.phoneNumber, setting: user.setting },
    });
  });

  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/subscriptions' },
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  // server.applyMiddleware({ app });
  server.applyMiddleware({ app, cors: false });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers).then();
