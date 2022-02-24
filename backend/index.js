const express = require("express");
const students = require("./students.json");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! 5");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(1000, () => {
  console.log("Server is running on port 1000");
});
