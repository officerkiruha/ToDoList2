const express = require('express');
const router = express.Router();
const {valuesToAdd,encrypPass,valuesToLogin,isLoggedIn} = require('../middelware/auth_MID.js');
const {register,login,createJwt,logout} = require('../controller/auth_C.js');

router.post('/reg',valuesToAdd,encrypPass,register);
router.post('/login',valuesToLogin,login,createJwt);
router.post('/logout',isLoggedIn,logout);

module.exports = router;