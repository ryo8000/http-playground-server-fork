import { app } from './app.js';
import { environment } from './env.js';

app.listen(environment.port, () => {
  console.info(`Server is running on http://localhost:${environment.port}`);
});
