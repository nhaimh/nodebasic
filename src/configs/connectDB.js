import mysql from "mysql2/promise";

// create the connection to database
console.log("create connection pool");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodebasic",
});

export default pool;
