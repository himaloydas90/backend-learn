const dns = require('node:dns')
const express = require("express");
require('dotenv').config()
const {authController, bankinfocontroller, allUser} = require("./Controller/authController.js");
const bankmidelwere = require("./midelwere/midelwere.js");
const dbconfig = require('./config/dbconfig.js');
dns.setServers(["8.8.8.8","1.1.1.1"])
dbconfig()

const app = express();
app.use(express.json());
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.post("/register", authController);

app.post("/bankinfo",bankmidelwere, bankinfocontroller)

app.get("/alluser",allUser)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

