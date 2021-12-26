const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const express = require("express");
const app = express();

const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", apiRoutes);

//port listening
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
