export const environment = {
  logLevel: process.env['LOG_LEVEL'] || 'info',
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: process.env['PORT'] === '0' ? 0 : Number(process.env['PORT']) || 8000,
};
