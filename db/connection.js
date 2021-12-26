const mysql = require("mysql2");
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // PASSWORD and PORT 8889 for MYSQL WORKBENCH connection
    password: "root",
    port: "8889",
    // PASSWORD and PORT 3306 NOT  for MYSQL WORKBENCH connection
    /*  password: "s4433221",
      port: "3306", */
    // database being used
    database: "employee_tracker",
  },
  console.log("Connected to the election database.")
);

module.exports = db;
