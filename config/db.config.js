const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tododb'
});

connection.connect((e) => {
    if (e) {
        console.e('error connecting to MySQL database:', e);
    } else {
        console.log('Connected to MySQL database!');
    }
})

// const sql = "CREATE DATABASE tododb";

// connection.query(sql, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database created");
//     }
// })
module.exports = connection