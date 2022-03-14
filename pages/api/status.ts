import type { NextApiRequest, NextApiResponse } from 'next';

interface DiploiStatusItem {
  identifier: string;
  name: string;
  description?: string;
  status?: 'red' | 'green' | 'yellow' | 'gray';
  isPending?: boolean;
  message?: string;
}

type DiploiStatusRootItem = DiploiStatusItem & { items?: DiploiStatusItem[] };

type DiploiStatus = {
  diploiStatusVersion: 1;
  items: DiploiStatusRootItem[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<DiploiStatus>) {
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const second = Math.round(new Date().getTime() / 1000);

  //await sleep(Math.round(Math.random() * 1000 * 10));

  const isRedisBuilding = false; //second % 3600 < 1200;
  const isRedisReady = true; // second % 3600 > 1200 && second % 3600 < 2400;

  const hasMysqlError = false; // second % 300 < 60;

  const status: DiploiStatus = {
    diploiStatusVersion: 1,
    items: [
      {
        identifier: 'app',
        name: 'App',
        description: 'NextJS application',
        items: [
          {
            identifier: 'www',
            description: 'NextJS front facing server',
            name: 'WWW',
            status: 'green',
          },
          {
            identifier: 'api',
            description: 'API Server',
            name: 'Api',
            status: 'green',
          },
        ],
      },
      ...(isRedisBuilding
        ? [
            {
              identifier: 'redis',
              name: 'Redis',
              description: 'Redis cache',
              status: 'yellow',
              isPending: true,
              message: 'Rebuilding cache...',
            } as DiploiStatusItem,
          ]
        : []),
      ...(isRedisReady
        ? [
            {
              identifier: 'redis',
              name: 'Redis',
              description: 'Redis cache',
              status: 'green',
              isPending: false,
              message: '',
            } as DiploiStatusItem,
          ]
        : []),
      {
        identifier: 'mysql',
        name: 'MySQL',
        description: 'MySQL 8.0.26',
        status: hasMysqlError ? 'red' : 'green',
        message: hasMysqlError ? 'Low on storage' : '',
      },
    ],
  };

  res.status(200).json(status);
}
