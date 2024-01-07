//Load env
const dotenv = require('dotenv');
dotenv.config();

// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const {authenticate} = require('./utils/database-connection')

//Init express
const app = express();

// Parsers for POST data
app.use(bodyParser.json({
}));
app.use(bodyParser.urlencoded({
    extended: false,
}));

// Set our API routes
const api = require('./api');
app.use('/api', api);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT ?? '8080';
app.set('port', port );

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Create DB connection
 * If success, create server connection
 */
authenticate()
    .then(() => {
        server.listen(port, () => {
            console.log(`Listening on port ${port}...`)
        })
    }).catch(console.error);
