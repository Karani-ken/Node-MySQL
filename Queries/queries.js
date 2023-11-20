const dbConfig = require('../Database/Config')
const insertUsersQuery = 'INSERT INTO users (name, email, address) VALUES (?, ?, ?)';
const createUserTableQuery = `CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), address VARCHAR(255),PRIMARY KEY (id))`;
const showDatabasesQuery = `SHOW DATABASES LIKE "${dbConfig.database}"`;
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;
const useDatabaseQuery = `USE ${dbConfig.database}`;
const showUsersTableQuery = 'SHOW TABLES LIKE "users"';

module.exports ={
    insertUsersQuery,
    createUserTableQuery,
    showDatabasesQuery,
    createDatabaseQuery,
    useDatabaseQuery,
    showUsersTableQuery
}