const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

//GET ALL ROLES FROM HERE
router.get("/role", (req, res) => {
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
router.get("/role/:id", (req, res) => {
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

// Delete a role by ID
router.delete("/role/:id", (req, res) => {
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
//
//Update a Role
router.put("/role/:id", (req, res) => {
  const sql = `UPDATE role SET title = ?, salary = ?, department_id= ?
               WHERE id = ?`;
  const params = [
    req.body.title,
    req.body.salary,
    req.body.department_id,
    req.params.id,
  ];
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
// Create a role
router.post("/role", ({ body }, res) => {
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

//

module.exports = router;
