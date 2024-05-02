const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

connectDB();

app.use(express.json())

app.get('/', (req, res)=> {
    res.send("hey there")
});

app.listen(PORT, ()=> {
    console.log("server is running on ", PORT);
})