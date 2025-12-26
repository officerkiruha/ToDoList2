const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
const db = require('./config/db_config.js');
const cookies = require('cookie-parser');
const path = require('path');


app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.use(cookies());



app.use('/',require('./routes/pages_R.js'));
app.use('/users',require('./routes/users_R.js'));
app.use('/auth',require('./routes/auth_R.js'));
app.use('/categories',require('./routes/categories_R.js'));
app.use('/tasks',require('./routes/tasks_R.js'));

app.listen(port,()=>{console.log(`http://${host}:${port}`)});
