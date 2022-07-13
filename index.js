const http = require('http');
const fs = require('fs');
const { createExpressApp } = require('./expressApp');
const { createApp } = require('./app');
const jsonDatabase = require('./data/jsonDatabase');

// Pagination size used in searches
const PAGE_SIZE = 16;

// Loading "database" data from JSON file
const data = fs.readFileSync('./data.json');

// Creating application instance with JSON based data and data layer
const app = createApp({
    searchPodcastsByProperties: jsonDatabase.searchPodcastsByProperties(data, PAGE_SIZE),
    getGenreById: jsonDatabase.getGenreById(data)
});

// Passing the created application instance to be used in the express app handling requests
const expressApp = createExpressApp(app);

// Setting port listened on by express
const port = normalizePort(process.env.PORT || '3000');
expressApp.set('port', port);


const server = http.createServer(expressApp);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Handle variable port formatting in envinroment variables
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// Handle HTTP errors
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Log application start and active port
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
