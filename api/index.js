const express = require('express');
const {expressjwt} = require('express-jwt');
const bcrypt = require('bcrypt');

const router = express.Router();

const chantier = require('./routes/chantier');
const {createToken} = require("../utils/token-utils");
const {getCustomResMessage, PersonnalError} = require("../utils/personnal-error");
const {findIncludeUser, createUser, User} = require("./helpers/user");
const { getRandomString, isValidEmail } = require('../utils/random-utils');

const jwtCheck = expressjwt({
    secret: process.env.SECRET_JWT,
    algorithms: ['HS256']
});

router.post('/session/signin', async (req, res) => {
    try {
        let {email, password} = req.body;
        if(email === undefined || password === undefined || !isValidEmail(email)){
            return res.status(500).json({key: 'Missing email or password'})
        }
        const user = await findIncludeUser(email);
        if(!user){
            return res.status(500).json({key: 'User not found'})
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(500).json({key: 'Wrong password'})
        }
        return res.json(createToken(user))
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on user signin', e)})
    }
});

router.post('/session/signup', async (req, res) => {
    try {
        let {email, password} = req.body;
        if(email === undefined || password === undefined || !isValidEmail(email)){
            return res.status(500).json({key: 'Missing email or password'})
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        let email_verif = getRandomString(30);
        const receivedUser = new User(email, hashedPassword, email_verif);
        await createUser(receivedUser);
        res.status(201).send('Your account has been created, you can now sign in');
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on user signup', e)})
    }
});

router.use('/protected', jwtCheck);
router.use('/protected/chantier', chantier);

module.exports = router;
