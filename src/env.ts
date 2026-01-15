export const environment = {
  logLevel: process.env['LOG_LEVEL'] || 'info',
  maxDelay: Number(process.env['MAX_DELAY']) || 10000,
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: process.env['PORT'] === '0' ? 0 : Number(process.env['PORT']) || 8000,
};
