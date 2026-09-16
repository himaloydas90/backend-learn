const dns = require('node:dns')
const express = require("express");
var cors = require('cors');
require('dotenv').config();
const dbconfig = require('./config/dbconfig.js');
dns.setServers(["8.8.8.8","1.1.1.1"])
dbconfig()
const app = express();
const router = require("./route/index.js")
app.use(express.json());
app.use(cors())
app.use(router)
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

