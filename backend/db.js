import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'realestate',
    port: 3306,
    database: 'BH-ESTATE'
});
