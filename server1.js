// GET all department
db.query(`SELECT * FROM department`, (err, rows) => {
  console.log(rows);
});

// GET a single department
db.query(`SELECT * FROM department WHERE id = 4`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});
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
// Delete a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create a candidate
const sql = `INSERT INTO department (name) 
                VALUES (?)`;
const params = ["Customer Support Team"];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create a candidate
app.post("/api/department", ({ body }, res) => {
  const errors = inputCheck(body, "name");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
});
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
