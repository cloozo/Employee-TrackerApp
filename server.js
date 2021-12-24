const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  console.log(`Server running on port ${PORT}`);
});
