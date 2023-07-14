const mysql = require("mysql2")
const mysql2 = require("mysql2/promise")


    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'manager',
        database: 'Movie_Booking',
        port: 3306,
        multipleStatements: true
    })

    const poolasync = mysql2.createPool({
        host: 'localhost',
        user: 'root',
        password: 'manager',
        database: 'Movie_Booking',
        port: 3306,
        multipleStatements: true
    })


module.exports = {pool , poolasync}