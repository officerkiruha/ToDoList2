const db = require('../config/db_config.js');
async function getAll() {
    let sql = `SELECT name FROM categoris`;
    //console.log(sql);
    let [rows] = await db.query(sql);
    console.log(rows);
    return rows;
};
async function add({name,userId}) {
    let sql = `INSERT INTO categoris (name,user_id) VALUES(?,?)`;
    let [result] = await db.query(sql,[name,userId]);
    console.log(result);
    return result.insertId;
}
module.exports = {
    getAll,add,
  
}