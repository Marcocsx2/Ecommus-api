import { merge } from 'lodash';
import { config as dev } from './dev';
import { config as test } from './testing';
import { config as prod } from './prod';
const env = process.env.NODE_ENV;

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  isProd: env === 'production',
  port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '2h',
  },
  secrets_refresh: {
    jwt: process.env.JWT_SECRET_REFRESH,
    jwtExp: '1y',
  },
  secrets_recover: {
    jwt: process.env.JWT_SECRET_RECOVER,
    jwtExp: '10m',
  }
};

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = dev;
    break;
  case 'test':
  case 'testing':
    envConfig = test;
    break;
  case 'prod':
  case 'production':
    envConfig = prod;
    break;
  default:
    envConfig = dev;
}

export default merge(baseConfig, envConfig);
