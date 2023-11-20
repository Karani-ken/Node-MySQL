const express = require('express')
const dbHandler = require('./Database/DbHandler/dbHandler')
const bodyParser = require('body-parser')
const app = express();
const port = 4000;
app.use(bodyParser.json());
dbHandler.pool.getConnection((err, connection)=>{
    if(err) throw err;
    console.log("MySQL connected successfully");
    dbHandler.initializeDatabase()
        .then(()=>{
            connection.release()
        })
        .catch((err)=>{
            connection.release();
            throw err;
        })
})
app.get('/', (req,res)=>{
    res.send('this my MySQL app');
});
app.post("/createuser", async (req,res)=>{
    const userData = req.body;
    
    try {
        await dbHandler.insertUser(userData);
        res.status(201).json({message:"User was inserted successfully"})
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
})

app.listen(port,()=>{
    console.log(`App started on http://localhost:${port}`);
})