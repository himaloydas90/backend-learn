const express = require("express");
const router = express.Router()
const {authController, bankinfocontroller, allUser, deletUser, updateUser} = require("../../Controller/authController");
const bankmidelwere = require("../../midelwere/midelwere");

router.post("/registration", authController);
router.delete("/deleteUsesr/:id",deletUser)
router.post("/updateUser/:id",updateUser)
router.post("/bankinfo",bankmidelwere, bankinfocontroller)
router.get("/alluser",allUser)

module.exports = router