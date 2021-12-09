import { redisClient } from '../../lib/redisClient';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = string[];
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    await redisClient.set('todo-items', JSON.stringify([]));
    res.status(200).json([]);
  } catch (e) {
    console.log('Got error', e);
  }
}
