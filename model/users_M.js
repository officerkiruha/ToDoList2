const db = require('../config/db_config.js');

async function getAll() {
    let sql = `SELECT id,name,email FROM users`;
    //console.log(sql);
    let [rows] = await db.query(sql);
    //console.log(rows);
    
    return rows;
};
async function getOne(id) {
    let sql = `SELECT id,name,email FROM users WHERE id = ?`;
    let [result] = await db.query(sql,[id]);
    return result[0];
}
async function remove(id) {
    let sql = `DELETE FROM users WHERE id = ?`;
    let [result] = await db.query(sql, [id]);
   // console.log(result);
    return result.affectedRows;
}
async function update(id,user) {
    let keys = Object.keys(user);
    let values = Object.values(user);
    let set = keys.map(k=>`${k}=?`).join(',');
    let sql = `UPDATE users SET ${set} WHERE id = ?`;
    let [result] = await db.query(sql, [...values,id]);
    //console.log(result);
    return result.affectedRows;
}

async function getByUserName(userName) {
    let sql = `SELECT * FROM users WHERE userName = ?`;
    let [result] = await db.query(sql,[userName]);
    return result[0];
}
async function getByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = ?`;
    let [result] = await db.query(sql,[email]);
    return result[0];
}
async function addUser({name,email,userName,pass}) {
    let sql = `INSERT INTO users (name,email,userName,pass) VALUES(?,?,?,?)`;
    let [result] = await db.query(sql,[name,email,userName,pass]);
    return result.insertId;
}

async function getCategoriesByUser(userId) {
    let sql = `SELECT * FROM categoris WHERE user_id = ?`;
    let [rows] = await db.query(sql,[userId]);
    return rows;
}

async function removeAllCategoriesByUser(userId) {
    let sql = `DELETE FROM categoris WHERE user_id = ?`;
    let [result] = await db.query(sql,[userId]);
    return result.affectedRows;
}

async function removeAllTasksByUser(userId) {
    let sql = `DELETE FROM tasks WHERE user_id = ?`;
    let [result] = await db.query(sql,[userId]);
    return result.affectedRows;
}


module.exports = {
    getAll,
    getOne,
    remove,
    update,
    getByUserName,
    getByEmail,
    addUser,
    getCategoriesByUser,
    removeAllCategoriesByUser,
    removeAllTasksByUser,
}