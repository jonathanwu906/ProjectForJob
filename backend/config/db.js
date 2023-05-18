const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, './.env') });

// Create a new MySQL pool with the given configuration
const pool = mysql.createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0
});

module.exports = pool;