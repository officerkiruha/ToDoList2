const express = require('express');
const router = express.Router();
const path = require('path');
const { isLoggedIn } = require('../middelware/auth_MID');

router.get('/',isLoggedIn,(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","index.html"))});
router.get('/register',(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","register.html"))});
router.get('/login',(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","login.html"))});
router.get('/categories',isLoggedIn,(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","categories.html"))});
router.get('/users',isLoggedIn,(req,res)=>{res.sendFile(path.join(__dirname,"..","Public","pages","users.html"))});
module.exports = router;