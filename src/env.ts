export const environment = {
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: process.env['PORT'] === '0' ? 0 : Number(process.env['PORT']) || 8000,
};
