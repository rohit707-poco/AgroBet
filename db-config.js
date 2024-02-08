const sql = require('mysql');
const dotenv = require('dotenv').config();
const con = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


con.connect((err)=>{
    if(err) throw err;
    else{
        console.log("Connected to database Successfully !!!");
    }
})

module.exports = con;