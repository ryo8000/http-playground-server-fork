export const environment = {
  port: process.env['PORT'] === '0' ? 0 : Number(process.env['PORT']) || 8000,
};
