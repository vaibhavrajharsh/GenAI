const express = require("express");
const cookieParser = require('cookie-parser')

//require all routes here
const authRouter = require('./routes/auth.routes')


const app = express();
app.use(express.json());
app.use(cookieParser())

//use all routes here
app.use("/api/auth",authRouter);

module.exports = app;
