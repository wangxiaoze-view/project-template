import sqlConfig from './sql.config';

export default {
  port: 8500,
  hostName: '127.0.0.1',
  jwtOptions: {
    secret: 'wangZe-secret',
    privateKey: 'wangZe-secret',
    expiresIn: '7d',
  },
  sqlConfig: sqlConfig()[process.env.WZ_ENV],
};
