import { toSafeInteger } from './utils/number.js';

const ALLOWED_LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
const ALLOWED_NODE_ENVS = ['development', 'production', 'test'];
const MIN_PORT = 0;
const MAX_PORT = 65535;

const logLevel = process.env['LOG_LEVEL'] ?? 'info';
if (!ALLOWED_LOG_LEVELS.includes(logLevel)) {
  throw new Error(
    `Invalid configuration: LOG_LEVEL (${logLevel}) must be one of: ${ALLOWED_LOG_LEVELS.join(', ')}.`,
  );
}

const nodeEnv = process.env['NODE_ENV'] ?? 'development';
if (!ALLOWED_NODE_ENVS.includes(nodeEnv)) {
  throw new Error(
    `Invalid configuration: NODE_ENV (${nodeEnv}) must be one of: ${ALLOWED_NODE_ENVS.join(', ')}.`,
  );
}

const portEnv = process.env['PORT'];
const port = portEnv !== undefined ? toSafeInteger(portEnv) : 8000;
if (port === undefined || port < MIN_PORT || port > MAX_PORT) {
  throw new Error(
    `Invalid configuration: PORT (${port}) must be a valid integer between ${MIN_PORT} and ${MAX_PORT}.`,
  );
}

export const environment = {
  logLevel,
  nodeEnv,
  port,
};
