const db = require("./db.config")

const sqlTodo = `CREATE TABLE IF NOT EXISTS todos
    (
      id BIGINT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255),
      detail TEXT(100),
      status BOOLEAN DEFAULT false,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      PRIMARY KEY (id)
    )`
    
db.query(sqlTodo, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});
    