const express = require('express');
const {expressjwt} = require('express-jwt');

const router = express.Router();

const chantier = require('./routes/chantier');
const session = require('./routes/session');



const jwtCheck = expressjwt({
    secret: process.env.SECRET_JWT,
    algorithms: ['HS256']
});

router.use("/session", session);
router.use('/protected', jwtCheck);
router.use('/protected/chantier', chantier);

module.exports = router;
