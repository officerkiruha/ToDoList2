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
async function getById(taskId,userId) {
    let sql = `SELECT * FROM tasks WHERE id = ? AND user_id = ?`;
    let [rows] = await db.query(sql, [taskId,userId]);
    return rows[0];
}
async function remove(taskId,userId){
    let sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[taskId,userId]);    
    return result.affectedRows;
}
async function update(taskId,userId,newTask){
    let keys = Object.keys(newTask);
    let values = Object.values(newTask);
    let set = keys.map(k=>`${k}=?`).join(',');
    let sql = `UPDATE tasks SET ${set} WHERE id = ?`;
    let [result] = await db.query(sql,[...values,taskId]);
    return result.affectedRows;
}
module.exports = {
   getTasks,add,getById,remove,update
}