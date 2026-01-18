import { toSafeInteger } from './utils/number.js';

export const environment = {
  logLevel: process.env['LOG_LEVEL'] || 'info',
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: toSafeInteger(process.env['PORT']) || 8000,
};
