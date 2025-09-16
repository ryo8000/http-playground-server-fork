import { AddressInfo } from 'net';
import { app } from './app.js';
import { environment } from './env.js';

const server = app.listen(environment.port, () => {
  console.info(`Server is running on http://localhost:${(server.address() as AddressInfo).port}`);
});
