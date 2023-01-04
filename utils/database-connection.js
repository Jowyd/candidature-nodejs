const mysql = require('mysql2');

const connection = mysql.createConnection({host: 'localhost', database: 'recrutement', user: 'root', password: 'root'});

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
