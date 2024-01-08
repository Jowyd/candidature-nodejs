const route = require('express').Router();
const { getRandomString, isValidEmail } = require('../../utils/random-utils');
const {findIncludeUser, createUser, User} = require("../helpers/user");
const {createToken} = require("../../utils/token-utils");
const {getCustomResMessage} = require("../../utils/personnal-error");
const bcrypt = require('bcrypt');


route.post('/signin', async (req, res) => {
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

route.post('/signup', async (req, res) => {
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
        res.status(201).json({key : 'Your account has been created, you can now sign in'});
    } catch (e) {
        return res.status(500).json({key: getCustomResMessage('Error on user signup', e)})
    }
});

module.exports = route;