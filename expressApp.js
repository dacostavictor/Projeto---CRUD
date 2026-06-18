const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const apiRoutes = require("./routes/api");
app.use("/api/users", apiRoutes);

module.exports = app;
