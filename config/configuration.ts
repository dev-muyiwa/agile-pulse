import * as process from 'process';

type DialectType = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    dialect: (process.env.DATABASE_DIALECT || 'postgres') as DialectType,
    host: process.env.DATABASE_HOST || 'localhost',
    name: process.env.DATABASE_NAME || 'agile-pulse',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
  },
});
