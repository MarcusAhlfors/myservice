import { redisClient } from '../../lib/redisClient';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = string[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let list: string[] = JSON.parse((await redisClient.get('todo-items')) || '[]');
  res.status(200).json(list);
}
