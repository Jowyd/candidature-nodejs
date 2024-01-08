const {query} = require("../../utils/database-connection");
const {PersonnalError} = require("../../utils/personnal-error");

class User{
    constructor(email, password, email_verification, age=null) {
        this.email = email;
        this.password = password;
        this.email_verification = email_verification;
        this.age = age;
    }
}

async function findIncludeUser(email) {
    return new Promise(async (resolve, reject) => {
        try{
            const users = await query("SELECT * FROM user WHERE email like ?", [email]);
            if(users.length === 0){
                reject(new PersonnalError('User not found', null));
            }
            resolve(users[0]);
        }catch(e){
            reject(new PersonnalError('Error when finding user: '+ email, e));
        }
    })
}

async function createUser(user) {
    return new Promise(async (resolve, reject) => {
        try{
            const users = await query("INSERT INTO user (email, password, email_verification) VALUES (?, ?, ?)", [user.email, user.password, user.email_verification]);
            return resolve(users[0]);
        }catch(e){
            if(e.code === 'ER_DUP_ENTRY'){
                return reject(new PersonnalError('User already exists', null));
            }
            return reject(new PersonnalError('Error when creating user: '+ user.email, e));
        }
    })
}


module.exports = {findIncludeUser, createUser, User};
