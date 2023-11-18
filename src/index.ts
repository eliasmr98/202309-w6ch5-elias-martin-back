import { createServer } from 'http';
import { app } from './app.js';

const PORT = process.env.PORT ?? 3100;
const server = createServer(app);

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});
