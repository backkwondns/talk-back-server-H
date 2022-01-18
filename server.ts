import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

import express from 'express';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

const mongoServer = process.env.MONGO_SERVER || 'mongodb://localhost:27017';
mongoose.connect(mongoServer, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB connected!');
  }
});

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  app.use(morgan('dev'));
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers).then();
