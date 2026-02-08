import { toSafeInteger } from './utils/number.js';

const ALLOWED_LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
type LogLevel = (typeof ALLOWED_LOG_LEVELS)[number];
const ALLOWED_NODE_ENVS = ['development', 'production', 'test'] as const;
type NodeEnv = (typeof ALLOWED_NODE_ENVS)[number];
const MIN_PORT = 0;
const MAX_PORT = 65535;

const getIntegerEnv = (key: string, defaultValue: number): number => {
  const valueEnv = process.env[key];
  const value = valueEnv !== undefined ? toSafeInteger(valueEnv) : defaultValue;
  if (value === undefined) {
    throw new Error(`Invalid configuration: ${key} (${valueEnv}) must be a valid integer.`);
  }
  return value;
};

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

const maxDelay = getIntegerEnv('MAX_DELAY', 10_000);
if (maxDelay < 0) {
  throw new Error(`Invalid configuration: MAX_DELAY (${maxDelay}ms) must be >= 0.`);
}

const port = getIntegerEnv('PORT', 8000);
if (port < MIN_PORT || port > MAX_PORT) {
  throw new Error(
    `Invalid configuration: PORT (${port}) must be an integer between ${MIN_PORT} and ${MAX_PORT}.`,
  );
}

const keepAliveTimeout = getIntegerEnv('KEEP_ALIVE_TIMEOUT', 5_000);
const headersTimeout = getIntegerEnv('HEADERS_TIMEOUT', 10_000);
const requestTimeout = getIntegerEnv('REQUEST_TIMEOUT', 30_000);

if (keepAliveTimeout < 0) {
  throw new Error(`Invalid configuration: KEEP_ALIVE_TIMEOUT (${keepAliveTimeout}ms) must be >= 0.`);
}
if (headersTimeout <= 0) {
  throw new Error(`Invalid configuration: HEADERS_TIMEOUT (${headersTimeout}ms) must be > 0.`);
}
if (requestTimeout <= 0) {
  throw new Error(`Invalid configuration: REQUEST_TIMEOUT (${requestTimeout}ms) must be > 0.`);
}
if (headersTimeout <= keepAliveTimeout) {
  throw new Error(
    `Invalid configuration: HEADERS_TIMEOUT (${headersTimeout}ms) must be greater than KEEP_ALIVE_TIMEOUT (${keepAliveTimeout}ms).`,
  );
}
if (requestTimeout <= headersTimeout) {
  throw new Error(
    `Invalid configuration: REQUEST_TIMEOUT (${requestTimeout}ms) must be greater than HEADERS_TIMEOUT (${headersTimeout}ms).`,
  );
}

export const environment = {
  logLevel: logLevel as LogLevel,
  maxDelay,
  nodeEnv: nodeEnv as NodeEnv,
  port,
  headersTimeout,
  keepAliveTimeout,
  requestTimeout,
};
