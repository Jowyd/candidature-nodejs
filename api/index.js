const express = require('express');
const {expressjwt} = require('express-jwt');

const router = express.Router();

const chantier = require('./routes/chantier');
const {createToken} = require("../utils/token-utils");
const {getCustomResMessage} = require("../utils/personnal-error");
const {findIncludeUser, createUser} = require("./helpers/user");

const jwtCheck = expressjwt({
    secret: process.env.SECRET_JWT,
    algorithms: ['HS256']
});

router.get('/session/signin', async (req, res) => {
    try {
        const user = await findIncludeUser(req.body.email);
        if (req.body.password !== user.password) {
            return res.status(500).json({key: 'Wrong password'})
        }
        return res.json(createToken(user))
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on user signin', e)})
    }

});

router.post('/session/signup', (req, res) => {
    try {
        const b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let c = '';
        for (let i = 0; i < 30; i++) {
            c += b.charAt(Math.floor(Math.random() * b.length));
        }
        const receivedUser = {
            email: req.body.email,
            password: req.body.password,
            email_verification: c
        }
        createUser(receivedUser);
        res.status(200).send('Your account has been created, you can now sign in');
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on user signup', e)})
    }
});

router.use('/protected', jwtCheck);
router.use('/protected/chantier', chantier);

module.exports = router;
