const express = require("express");
const router = express.Router()
const multer = require('multer');
const {authController, bankinfocontroller, allUser, deletUser, updateUser, imageUploder} = require("../../Controller/authController");
const bankmidelwere = require("../../midelwere/midelwere");


const photoStore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "img" + Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: photoStore });

router.post("/registration", authController);
router.delete("/deleteUsesr/:id",deletUser)
router.post("/updateUser/:id",updateUser)
router.post("/bankinfo",bankmidelwere, bankinfocontroller)
router.get("/alluser",allUser)
router.post("/imageUploder",upload.single('avatar'),imageUploder)

module.exports = router