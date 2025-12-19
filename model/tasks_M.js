const db = require('../config/db_config.js');
async function getTasks(userId) {
    let sql = `SELECT * FROM tasks WHERE user_id = ?`;
    let [rows] = await db.query(sql,[userId]);
    return rows;
}
async function add({text,userId}) {
    let sql = `INSERT INTO tasks (text, user_id) VALUES (?, ?)`;
    let [result] = await db.query(sql, [text,userId]);
    return result.insertId;
}
async function getById(catid,useid) {
    let sql = `SELECT * FROM tasks WHERE id = ? AND user_id = ?`;
    let [rows] = await db.query(sql, [catid,useid]);
    return rows[0];
}
async function remove(taskId,userId) {
    let sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[taskId]);
    return result.affectedRows;
}
module.exports = {
   getTasks,add,getById,remove
}