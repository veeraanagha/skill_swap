const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT
app.use(express.json())

app.get('/', (req, res)=> {
    res.send("hey there")
});

app.listen(PORT, ()=> {
    console.log("server is running on ", PORT);
})