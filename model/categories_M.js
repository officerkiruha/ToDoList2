const db = require('../config/db_config.js');

async function getAll(userId) {
    let sql = `SELECT * FROM categoris WHERE user_id = ?`;
    let [rows] = await db.query(sql,[userId]);
    return rows;
}

async function getById(catid,useid) {
    let sql = `SELECT * FROM categoris WHERE id = ? AND user_id = ?`;
    let [rows] = await db.query(sql, [catid,useid]);
    return rows[0];
}

async function add({name, userId}) {
    let sql = `INSERT INTO categoris (name, user_id) VALUES (?, ?)`;
    let [result] = await db.query(sql, [name, userId]);
    return result.insertId;
}

async function remove(id,userId) {
    let sql = `DELETE FROM categoris WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[id,userId]);
    return result.affectedRows;
}
async function updateCategory(id, userId, name) {
    let sql = `UPDATE categoris SET name = ? WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql, [name, id, userId]);
    return result.affectedRows;
}
async function removeTasksByCategory(id,userId) {
    let sql = `DELETE FROM tasks WHERE category_id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[id,userId]);
    return result.affectedRows;
}
async function getTasksByCategory(id,userId) {
    let sql = `SELECT * FROM tasks WHERE category_id = ? AND user_id = ?`;
    let [rows] = await db.query(sql, [id,userId]);
    return rows;
}

module.exports = {
    getAll,
    getById,
    add,
    remove,
    removeTasksByCategory,
    getTasksByCategory,
    updateCategory,
}