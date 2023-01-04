const {query} = require("../../utils/database-connection");

function findIncludeUser(email) {
    return new Promise(async (resolve) => {
        const users = await query("SELECT * FROM user WHERE email like ?", [email]);
        resolve(users[0]);
    })
}

function createUser(user) {
    return new Promise(async (resolve) => {
        await query('INSERT INTO user (email, password) VALUES (?, ?)', [user.email, user.password]);
        resolve();
    })
}


module.exports = {findIncludeUser, createUser};
