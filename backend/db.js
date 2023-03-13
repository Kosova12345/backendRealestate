import mysql from 'mysql'


export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'realestate',
    database: 'BH-ESTATE'
})