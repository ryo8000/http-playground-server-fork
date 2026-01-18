import { toSafeInteger } from './utils/number.js';

const keepAliveTimeout = toSafeInteger(process.env['KEEP_ALIVE_TIMEOUT']) || 5000;
const headersTimeout = toSafeInteger(process.env['HEADERS_TIMEOUT']) || 10000;
const requestTimeout = toSafeInteger(process.env['REQUEST_TIMEOUT']) || 30000;

if (headersTimeout <= keepAliveTimeout) {
  throw new Error(
    `Invalid timeout configuration: headersTimeout (${headersTimeout}ms) must be greater than keepAliveTimeout (${keepAliveTimeout}ms)`,
  );
}

if (requestTimeout <= headersTimeout) {
  throw new Error(
    `Invalid timeout configuration: requestTimeout (${requestTimeout}ms) must be greater than headersTimeout (${headersTimeout}ms)`,
  );
}

export const environment = {
  headersTimeout,
  keepAliveTimeout,
  logLevel: process.env['LOG_LEVEL'] || 'info',
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: toSafeInteger(process.env['PORT']) || 8000,
  requestTimeout,
};
