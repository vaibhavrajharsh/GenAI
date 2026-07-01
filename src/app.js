const express = require("express");

//require all routes here
const authRouter = require('./routes/auth.routes')


const app = express();
app.use(express.json());

//use all routes here
app.use("/api/auth",authRouter);

module.exports = app;
