import { createConnection } from 'typeorm';
import { env } from '@/main/config/env';

import './config/module-alias';
import 'reflect-metadata';

createConnection()
  .then(async () => {
    const { app } = await import('@/main/config/app');
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
  })
  .catch(console.error);
