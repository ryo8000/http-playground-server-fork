import { app } from './app.js';
import { environment } from './env.js';

const server = app.listen(environment.port, () => {
  const address = server.address();
  if (address && typeof address === 'object') {
    console.info(`Server is running on http://localhost:${address.port}`);
  } else {
    console.info(`Server is running on ${address || 'an unknown address'}`);
  }
});

server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
