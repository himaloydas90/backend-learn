const dns = require('node:dns')
const express = require("express");
var cors = require('cors');
require('dotenv').config();
const {authController, bankinfocontroller, allUser, deletUser, updateUser} = require("./Controller/authController.js");
const bankmidelwere = require("./midelwere/midelwere.js");
const dbconfig = require('./config/dbconfig.js');
dns.setServers(["8.8.8.8","1.1.1.1"])
dbconfig()

const app = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.post("/registration", authController);
app.delete("/deleteUsesr/:id",deletUser)
app.post("/updateUser/:id",updateUser)

app.post("/bankinfo",bankmidelwere, bankinfocontroller)

app.get("/alluser",allUser)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

