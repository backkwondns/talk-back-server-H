import express from 'express';
import { makeUserMock } from '../libs/makeMock';

const route = express.Router();

route.get('/user/:times', async (req, res) => {
  const result = await makeUserMock(Number(req.params.times));
  res.json({ result });
});

export default route;
