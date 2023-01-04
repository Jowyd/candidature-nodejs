const jwt = require('jsonwebtoken');
const {deleteNullValues} = require("./json-utils");

const connectedUser = (req) => {
    const authorization = req.headers.authorization;
    return extractToken(authorization.split(' ')[1]);
}

const extractToken = (token) => {
    return jwt.decode(token);
};

const verifyAndExtractToken = (token) => {
    return jwt.verify(token, process.env.SECRET_JWT, (err, content) => {
        if (err) {
            return null;
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
            expiresIn: 60 * 60 * 24 * 7 * 365,
            algorithm: 'HS256'
        }
    );
    return {
        user,
        jwtToken
    }
};

module.exports = {createToken, extractToken, connectedUser, verifyAndExtractToken};
