const jwt = require('jsonwebtoken');
const {deleteNullValues} = require("./json-utils");
const { PersonnalError } = require('./personnal-error');

const connectedUser = (req) => {
    const authorization = req.headers.authorization;
    return extractToken(authorization.split(' ')[1]);
}

const extractToken = (token) => {
    return jwt.decode(token);
};

/**
 * Verifies and extracts the content from a JWT token.
 * @param {string} token - The JWT token to verify and extract.
 * @returns {object} - The content extracted from the token.
 * @throws {PersonnalError} - If the token is invalid.
 */
const verifyAndExtractToken = (token) => {
    return jwt.verify(token, process.env.SECRET_JWT, (err, content) => {
        if (err) {
            throw new PersonnalError('Invalid token', err);
        }
        return content;
    });
}

const createToken = (user) => {
    deleteNullValues(user);
    const jwtToken = jwt.sign(
        user,
        process.env.SECRET_JWT,
        {
            expiresIn: 60 * 60 ,
            algorithm: 'HS256'
        }
    );
    return {
        user,
        jwtToken
    }
};

module.exports = {createToken, extractToken, connectedUser, verifyAndExtractToken};
