import { app } from './app.js';
import { environment } from './env.js';
import { log } from './logger.js';

const server = app.listen(environment.port, () => {
  const address = server.address();
  if (address && typeof address === 'object') {
    log.info(`Server is running on http://localhost:${address.port}`);
  } else {
    log.info(`Server is running on ${address || 'an unknown address'}`);
  }
});

server.headersTimeout = environment.headersTimeout;
server.requestTimeout = environment.requestTimeout;
server.keepAliveTimeout = environment.keepAliveTimeout;

server.on('error', (err) => {
  log.error({ err }, 'Server failed to start');
  process.exit(1);
});
