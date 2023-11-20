const mysql = require('mysql')
const dbConfig = require('../Config')
const queries = require('../../Queries/queries')

const pool = mysql.createPool(dbConfig)

const executeQuery = (query,values=[])=>{
    return new Promise((resolve,reject)=>{
        pool.query(query,values,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result)
            }
        })
    })
}

const createDatabaseIfNotExists= async ()=>{
    try{
        const result = await executeQuery(queries.showDatabasesQuery);
        const DatabaseExists = result.some(db => db.Database === dbConfig.database);
        if(!DatabaseExists){
            await executeQuery(queries.createDatabaseQuery)
            console.log("Database created successfully")
        }else{
            console.log("Database already exists")
        }
    }catch(err){
        throw err;
    }
}
const createTableIfNotExists = async ()=>{
    try {
        const result = await executeQuery(queries.showUsersTableQuery);
        const tableExists = result.length > 0
        if(!tableExists){
            await executeQuery(queries.createUserTableQuery);
            console.log('Table was created successfully');
        }else{
            console.log("Table already exists");
        }
    } catch (err) {
        throw err;
    }
}
const insertUser = async (userData)=>{
    const {name, email , address} = userData;
    try {        
        await executeQuery(queries.insertUsersQuery,[name,email,address])
        console.log("User Added successfully");
    } catch (err) {
        throw err;
    }
}
const selectUsers = async ()=>{
    try {
        const users= await executeQuery(queries.selectUsersQuery);
        return users
    } catch (error) {
        throw error;
    }
}
const selectByName = async (name)=>{
    try {
        const user = await executeQuery(queries.selectUserByName,[name])
        return user;
    } catch (error) {
        throw error
    }
}
const orderByName = async () =>{
    try {
        const users = await executeQuery(queries.orderByName);
        return users;
    } catch (error) {
        throw error
    }
}
const initializeDatabase = async ()=>{
    try {
        await createDatabaseIfNotExists();
        await executeQuery(queries.useDatabaseQuery);
        await createTableIfNotExists()
    } catch (err) {
        throw err;
    }
}

module.exports ={
    pool,
    initializeDatabase,
    insertUser,
    selectUsers,
    selectByName,
    orderByName
}