import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  entities: ['dist/infra/postgres/entities/index.js'],
};
