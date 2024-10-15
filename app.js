const mysql = require('mysql2/promise');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const port = 8080;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: true }));

const { HOST, NAME_DB, PASSWORD, DATABASE_NAME, PORT } = process.env;

const pool = mysql.createPool({
    host: HOST,
    user: NAME_DB,
    password: PASSWORD,
    database: DATABASE_NAME,
    port: PORT,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database Connected...');
        connection.release(); 
    } catch (error) {
        console.error('Database Error', error);
    }
})();

module.exports = pool;

const indexRouter  = require('./Routers/Index');
app.use('/',indexRouter)

const loginRouter  = require('./Routers/Login');
app.use('/',loginRouter)

const RegisRouter  = require('./Routers/Register');
app.use('/',RegisRouter)

const DashboardRouter  = require('./Routers/dashboard');
app.use('/',DashboardRouter)










app.listen(port , (req,res)=>{
    console.log(`http://localhost:`+port)
})



