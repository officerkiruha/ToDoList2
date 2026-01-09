const {getTasks,add,getById,remove,update} = require('../model/tasks_M');
async function getAllTasks(req,res) {
    try {
        let tasks = await getTasks(req.user.id);
        
        if (!tasks.length) {
            return res.status(200).json([]);
        }

        res.status(200).json(tasks);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}
async function addTask(req,res) {
    try {
        const text = req.body.text;
        const userId = req.user.id;
        let CategoriId = req.body.category_id || null;
        const taskId = await add({ text, userId,CategoriId});
        if (!taskId) {
            return res.status(500).json({ message:"Server Error" });
        }
        res.status(201).json({ message:"Task added!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}

async function getTasksById(req,res) {
  try {
        let id = req.id;
        let userId = req.user.id;

        let task = await getById(id,userId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

async function deleteTask(req,res) {
    try{
        let affectedRows = await remove(req.id,req.user.id);
        if(!affectedRows){
            return res.status(400).json({message:`task ${req.id} not found!`})
        }
        res.status(200).json({message:"deleted!"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
}

async function updateTask(req,res) {
    try{
        let Taskid = req.id;
        let newTask =  req.newTask;
        let userId = req.user.id;
        let affected = await update(Taskid,userId,newTask);
        if(!affected){
            return res.status(400).json({message:"Task not found or not yours"})
        }
        res.status(200).json({message:"Task updated!"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
}

module.exports = {
   getAllTasks,
   addTask,
   getTasksById,
   deleteTask,
   updateTask,
}