const db = require('../config/db_config.js');
async function getTasks(userId) {
    let sql = `SELECT * FROM tasks WHERE user_id = ?`;
    let [rows] = await db.query(sql,[userId]);
    return rows;
}
async function addTask({text,is_done,categoryId},user_id) {
    let sql = `INSERT INTO tasks (text,is_done,category_id,user_id) VALUES (?,?,?,?)`;
    let [result] = await db.query(sql, [text,is_done,categoryId,user_id]);
    return result.insertId;
}
module.exports = {
   getTasks,addTask
}