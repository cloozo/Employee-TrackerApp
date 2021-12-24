const mysql = require("mysql2");
const express = require("express");
const app = express();
const inputCheck = require("./utils/inputCheck");
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "s4433221",
    database: "employee_tracker",
  },
  console.log("Connected to the election database.")
);

// Get all department
app.get("/api/department", (req, res) => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});
// Get a single department by ID
app.get("/api/department/:id", (req, res) => {
  const sql = `SELECT * FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Delete a department
app.delete("/api/department/:id", (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "department not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

//
// Create a department

app.post("/api/department", ({ body }, res) => {
  const errors = inputCheck(body, "name");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO department (name)
  VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});
//
//
// routes the "app.get" route must run before the "app.use" for it to work
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
//port listening
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
