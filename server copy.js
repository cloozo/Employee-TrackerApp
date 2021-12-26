const db = require("./db/connection");
const express = require("express");
const app = express();

const apiRoutes = require("./routes/apiRoutes");
const PORT = process.env.PORT || 3001;

const inputCheck = require("./utils/inputCheck");

// Use apiRoutes
// app.use("/api", apiRoutes);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//GET ALL ROLES FROM HERE
app.get("/api/role", (req, res) => {
  const sql = `SELECT * FROM role`;
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
// Get a single role by ID
app.get("/api/role/:id", (req, res) => {
  const sql = `SELECT * FROM role WHERE id = ?`;
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
// Create a role
app.post("/api/role", ({ body }, res) => {
  const errors = inputCheck(body, "title", "salary", "department_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

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
// Delete a role
app.delete("/api/role/:id", (req, res) => {
  const sql = `DELETE FROM role WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "role not found",
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
//Update a Role
app.put("/api/role/:id", (req, res) => {
  const sql = `UPDATE role SET department_id = ? 
               WHERE id = ?`;
  const params = [req.body.department_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "role not found",
      });
    } else {
      res.json({
        message: "record updated successfully!",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});
//
//

//Default page
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
//port listening
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
