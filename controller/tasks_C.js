const {getTasks,add} = require('../model/tasks_M');
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
        const taskId = await add({ text, userId });
        if (!taskId) {
            return res.status(500).json({ message:"Server Error" });
        }
        res.status(201).json({ message:"Task added!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}
module.exports = {
   getAllTasks,addTask
}