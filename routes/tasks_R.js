const express = require('express');
const router = express.Router();
const  {getAllTasks,addTask,getTasksById,deleteTask} = require('../controller/tasks_C.js');
const {vaildValues,isValidId} = require('../middelware/tasks_MID.js');
const {isLoggedIn} = require('../middelware/auth_MID.js');

router.use(isLoggedIn);

router.get('/',getAllTasks);
router.get('/:id',isValidId,getTasksById);
router.post('/',vaildValues,addTask);
router.delete('/:id',isValidId,deleteTask);
//router.patch('/:id', isValidId);

module.exports = router;