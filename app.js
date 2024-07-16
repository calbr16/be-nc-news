const express = require("express");
const apiRouter = require("./routes/api-router");
const app = express();
const port = 9000;

app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;