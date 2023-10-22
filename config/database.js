//const mysql = require("mysql");
// if we don't want to import everything
const { createPool } = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});
// there are many other option available on mysql npm packages documentation

module.exports = pool;