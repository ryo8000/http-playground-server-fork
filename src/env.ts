import { toSafeInteger } from './utils/number.js';

const logLevel = process.env['LOG_LEVEL'] ?? 'info';
if (!['trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(logLevel)) {
  throw new Error(
    `Invalid configuration: LOG_LEVEL (${logLevel}) must be one of: trace, debug, info, warn, error, fatal.`,
  );
}

const nodeEnv = process.env['NODE_ENV'] ?? 'development';
if (!['development', 'production', 'test'].includes(nodeEnv)) {
  throw new Error(
    `Invalid configuration: NODE_ENV (${nodeEnv}) must be one of: development, production, test.`,
  );
}

const port = toSafeInteger(process.env['PORT']) ?? 8000;
if (port < 0 || port > 65535) {
  throw new Error(`Invalid configuration: PORT (${port}) must be between 0 and 65535.`);
}

export const environment = {
  logLevel: logLevel as 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  nodeEnv: nodeEnv as 'development' | 'production' | 'test',
  port,
};
