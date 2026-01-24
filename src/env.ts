import { toSafeInteger } from './utils/number.js';

const ALLOWED_LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as const;
type LogLevel = (typeof ALLOWED_LOG_LEVELS)[number];
const ALLOWED_NODE_ENVS = ['development', 'production', 'test'] as const;
type NodeEnv = (typeof ALLOWED_NODE_ENVS)[number];
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

const keepAliveTimeoutEnv = process.env['KEEP_ALIVE_TIMEOUT'];
const keepAliveTimeout =
  keepAliveTimeoutEnv !== undefined ? toSafeInteger(keepAliveTimeoutEnv) : 5_000;
const headersTimeoutEnv = process.env['HEADERS_TIMEOUT'];
const headersTimeout = headersTimeoutEnv !== undefined ? toSafeInteger(headersTimeoutEnv) : 10_000;
const requestTimeoutEnv = process.env['REQUEST_TIMEOUT'];
const requestTimeout = requestTimeoutEnv !== undefined ? toSafeInteger(requestTimeoutEnv) : 30_000;

if (keepAliveTimeout === undefined || keepAliveTimeout < 0) {
  throw new Error(
    `Invalid timeout configuration: keepAliveTimeout (${keepAliveTimeout}ms) must be >= 0`,
  );
}
if (headersTimeout === undefined || headersTimeout < 0) {
  throw new Error(
    `Invalid timeout configuration: headersTimeout (${headersTimeout}ms) must be > 0`,
  );
}
if (requestTimeout === undefined || requestTimeout <= 0) {
  throw new Error(
    `Invalid timeout configuration: requestTimeout (${requestTimeout}ms) must be > 0`,
  );
}
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
  logLevel: logLevel as LogLevel,
  nodeEnv: nodeEnv as NodeEnv,
  port,
  headersTimeout,
  keepAliveTimeout,
  requestTimeout,
};
