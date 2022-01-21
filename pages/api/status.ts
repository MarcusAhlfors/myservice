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
            name: 'WWW',
            status: 'green',
          },
          {
            identifier: 'api',
            name: 'Api',
            status: 'green',
          },
        ],
      },
      {
        identifier: 'redis',
        name: 'Redis',
        description: 'Redis cache',
        status: 'yellow',
        isPending: true,
        message: 'Rebuilding cache...',
      },
      {
        identifier: 'mysql',
        name: 'MySQL',
        description: 'MySQL database',
        status: 'red',
        message: 'Out of memory',
      },
    ],
  };

  res.status(200).json(status);
}
