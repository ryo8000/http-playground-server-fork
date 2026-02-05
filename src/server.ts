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

server.on('error', (err) => {
  log.error({ err }, 'Server failed to start');
  process.exit(1);
});

let isShuttingDown = false;

process.on('SIGTERM', () => {
  if (isShuttingDown) {
    log.warn('Shutdown already in progress...');
    return;
  }
  isShuttingDown = true;

  log.info('SIGTERM signal received: closing HTTP server');

  const forceExitTimeout = setTimeout(() => {
    log.error('Server close timed out, forcing exit');
    process.exit(1);
  }, 10_000);

  server.close((err) => {
    clearTimeout(forceExitTimeout);

    if (err) {
      log.error({ err }, 'Error during server close');
      process.exit(1);
    }

    log.info('HTTP server closed');
    process.exit(0);
  });
});
