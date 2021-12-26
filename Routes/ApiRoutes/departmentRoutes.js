const express = require("express");
const app = express();
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");
// originally app.get('/api/employees')
router.get("/department", (req, res) => {
  // internal logic remains the same
});

//

module.exports = router;
