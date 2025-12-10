const express = require('express');
const router = express.Router();
const  {getAllCategories,addCategory} = require('../controller/categories_C');
const {valuesToAdd} = require('../middelware/categories_MID.js');
const { isLoggedIn } = require('../middelware/auth_MID');
//const {} = require('../middelware/categories_MID.js');



router.get('/',isLoggedIn,getAllCategories);
router.post('/',isLoggedIn,valuesToAdd,addCategory);
//router.get('/:id',isValidId,getOneUser);
//router.delete('/:id',isValidId,deleteUser);
//router.patch('/:id',isValidId,valuesToEdit,updateUser)

module.exports = router;