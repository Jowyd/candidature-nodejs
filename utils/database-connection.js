const mysql = require('mysql2');
dotenv = require('dotenv');

const connection = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });

const pool = mysql.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE,     multipleStatements: true,
    charset: "utf8mb4_unicode_ci"});

/**
 * Authenticates the database connection.
 * @returns {Promise<void>} A promise that resolves when the connection is authenticated.
 */
function authenticate() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) reject(err);
            resolve();
        })
    })
}

/**
 * Wrap SQL Query to Promise
 * @param sql The SQL query as a string
 * @param params The SQL params as an array
 * @returns {Promise<rows>} the rows returned by the SQL query
 */
function query(sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params ?? [], (err, result) => {
            if (err) reject(err)
            resolve(result);
        })
    })
}

module.exports = {connection: connection, authenticate: authenticate, query: query};
