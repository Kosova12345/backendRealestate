import mysql from 'mysql'


export const db = mysql.createConnection({
    host: 'containers-us-west-205.railway.app',
    user: 'root',
    password: 'Miymbf5rQZU1lI9h6Ex5',
    database: 'railway'
})
