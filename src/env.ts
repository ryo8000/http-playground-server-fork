import { toSafeInteger } from './utils/number.js';

const ALLOWED_LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
type LogLevel = typeof ALLOWED_LOG_LEVELS[number];
const ALLOWED_NODE_ENVS = ['development', 'production', 'test'] as const;
type NodeEnv = typeof ALLOWED_NODE_ENVS[number];
const MIN_PORT = 0;
const MAX_PORT = 65535;

const logLevel = process.env['LOG_LEVEL'] ?? 'info';
if (!(ALLOWED_LOG_LEVELS as readonly string[]).includes(logLevel)) {
  throw new Error(
    `Invalid configuration: LOG_LEVEL (${logLevel}) must be one of: ${ALLOWED_LOG_LEVELS.join(', ')}.`,
  );
}

const nodeEnv = process.env['NODE_ENV'] ?? 'development';
if (!(ALLOWED_NODE_ENVS as readonly string[]).includes(nodeEnv)) {
  throw new Error(
    `Invalid configuration: NODE_ENV (${nodeEnv}) must be one of: ${ALLOWED_NODE_ENVS.join(', ')}.`,
  );
}

const portEnv = process.env['PORT'];
const port = portEnv !== undefined ? toSafeInteger(portEnv) : 8000;
if (port === undefined || port < MIN_PORT || port > MAX_PORT) {
  throw new Error(
    `Invalid configuration: PORT (${portEnv}) must be a valid integer between ${MIN_PORT} and ${MAX_PORT}.`,
  );
}

export const environment = {
  enableShutdown: process.env['ENABLE_SHUTDOWN'] === 'true',
  logLevel: logLevel as LogLevel,
  nodeEnv: nodeEnv as NodeEnv,
  port,
};
