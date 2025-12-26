const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","index.html"))});
router.get('/register',(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","register.html"))});
router.get('/login',(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","login.html"))});

module.exports = router;