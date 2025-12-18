const {getTasks, addTask} = require('../model/tasks_M');
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
async function addTasks(req,res) {
    try {
        console.log('addTasks body:', req.body, 'user:', req.user);
        const text = req.body && req.body.text;
        const categoryId = req.body && (req.body.category_id ?? req.body.categoryId);
        const userId = req.user && req.user.id;

        if (!text || !userId) {
            return res.status(400).json({ message: "Missing text or user" });
        }

        const payload = { text, category_id: categoryId, user_id: userId };

        // שים לב: העבר גם את userId כפרמטר אם המודל מצפה לכך
        const result = await addTask(payload, userId);
        console.log('addTask result:', result);

        if (!result) {
            return res.status(500).json({ message:"Server Error" });
        }

        res.status(201).json({ message:"Task added!", id: result });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message:"Server Error" });
    }
}
module.exports = {
   getAllTasks,addTasks
}