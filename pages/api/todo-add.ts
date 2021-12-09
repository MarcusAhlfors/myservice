import { redisClient } from '../../lib/redisClient';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = string[];
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    let list: string[] = JSON.parse((await redisClient.get('todo-items')) || '[]');
    list.push(Math.round(Math.random() * 10000).toString());
    await redisClient.set('todo-items', JSON.stringify(list));
    res.status(200).json(list);
  } catch (e) {
    console.log('Got error', e);
  }
}
