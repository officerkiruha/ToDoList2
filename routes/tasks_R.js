const express = require('express');
const router = express.Router();
const  {getAllTasks,addTask} = require('../controller/tasks_C.js');
const {vaildValues} = require('../middelware/tasks_MID.js');
const {isLoggedIn} = require('../middelware/auth_MID.js');

router.use(isLoggedIn);

router.get('/',getAllTasks);
//router.get('/:id',isValidId);
router.post('/',vaildValues,addTask);
//router.delete('/:id',isValidId);
//router.patch('/:id', isValidId);

module.exports = router;