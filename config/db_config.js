const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dateStrings: true
});

pool.getConnection((err,connection)=>{
    if(err){
        console.error('Error Connecting to mySQL',err.message);
    }
    else{
        console.log('mySQL Have Been Connecting !');
        connection.release();
   }
})

module.exports = pool.promise();