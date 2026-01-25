import { toSafeInteger } from './utils/number.js';

const getNumericEnv = (
  envVar: string,
  defaultValue: number,
  options: {
    min?: number;
    max?: number;
    minExclusive?: boolean;
  } = {},
): number => {
  const envValue = process.env[envVar];
  const value = envValue !== undefined ? toSafeInteger(envValue) : defaultValue;
  const { min, max, minExclusive = false } = options;

  if (value === undefined) {
    throw new Error(`Invalid configuration: ${envVar} (${envValue}) must be a valid integer.`);
  }

  if (min !== undefined) {
    const isValid = minExclusive ? value > min : value >= min;
    if (!isValid) {
      const operator = minExclusive ? '>' : '>=';
      throw new Error(`Invalid configuration: ${envVar} (${value}) must be ${operator} ${min}.`);
    }
  }

  if (max !== undefined && value > max) {
    throw new Error(`Invalid configuration: ${envVar} (${value}) must be <= ${max}.`);
  }

  return value;
};

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

const port = getNumericEnv('PORT', 8000, { min: MIN_PORT, max: MAX_PORT });

const keepAliveTimeout = getNumericEnv('KEEP_ALIVE_TIMEOUT', 5_000, { min: 0 });
const headersTimeout = getNumericEnv('HEADERS_TIMEOUT', 10_000, { min: 0, minExclusive: true });
const requestTimeout = getNumericEnv('REQUEST_TIMEOUT', 30_000, { min: 0, minExclusive: true });
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
