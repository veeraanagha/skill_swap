const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const authRouter = require('./routes/authRouter');
require('dotenv').config();
const PORT = process.env.PORT;

connectDB();

app.use(express.json())

app.use('/user', authRouter);

app.listen(PORT, ()=> {
    console.log("server is running on ", PORT);
})