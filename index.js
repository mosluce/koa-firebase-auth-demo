const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port);

server.on('error', console.log);
server.on('listening', () => console.log('server is running on', port));
