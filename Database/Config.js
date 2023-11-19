const mysql = require('mysql')
const sql = "CREATE TABLE users (name VARCHAR(255), email VARCHAR(255),address VARCHAR(255))"
const dbConfig = {
     host:"localhost",
    port:3306,
    user:"root",
    password:"E9zb3q@3340"
}
const connection = mysql.createConnection(dbConfig)

connection.connect((err)=>{
    if(err) throw err;
    console.log('mysql connected succefully');
    //check n database exists
    connection.query('SHOW DATABASES LIKE "myTestDb"',(err, result)=>{
        if(err) throw err;
        if(result === 0){
            connection.query("CREATE DATABASE myTestDb",(err)=>{
                if(err) throw err;
                console.log('Database create');
                //create table in the database
                connection.query(sql,(err)=>{
                    if(err) throw err;
                    console.log('Table created successfully')
                })
            });
        }else{
            console.log('Database already exists');
            connection.query('USE myTestDb',(err)=>{
                if(err) throw err;
                connection.query(sql,(err)=>{
                    if(err) throw err;
                    console.log('Table created successfully')
                })
            })
        }
    })
    
})

module.exports = connection;