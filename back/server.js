const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.on('error', (err) => {
    console.log(`Server Error | ${err}`);
});
server.on('listening', () => {
    const urlServer = server.address();
    const portServer = app.PORT;
    console.log(`Server On | ${urlServer}:${portServer}`);
});

server.listen(process.env.PORT || 3000);