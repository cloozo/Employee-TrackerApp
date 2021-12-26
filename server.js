const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
//
const app = express();
const PORT = process.env.PORT || 3001;
// const inputCheck = require("./utils/inputCheck");

// Use apiRoutes
app.use("/api", apiRoutes);
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//port listening
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

