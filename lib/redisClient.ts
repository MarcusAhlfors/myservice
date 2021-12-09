import { createClient } from 'redis';

export const redisClient = createClient({
  url: 'redis://:xxxyyy@redis', // TODO: hardcoded password
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
/*await*/ redisClient.connect();
