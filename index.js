const express = require('express')
const dbConnection = require('./Database/Config')
const app = express();
const port = 4000;

app.get('/', (req,res)=>{
    res.send('this my MySQL app');
});

app.listen(port,()=>{
    console.log(`App started on port${port}`);
})