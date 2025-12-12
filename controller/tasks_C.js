const {getTask} = require('../model/tasks_M');
async function getAllTasks(req,res) {
    try {
        let tasks = await getTask(req.user.id);
        
        if (!tasks.length) {
            return res.status(200).json([]);
        }

        res.status(200).json(tasks);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}

module.exports = {
   getAllTasks
}