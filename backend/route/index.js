const express = require("express");
const router = express.Router()
const authRoute = require("./api/authRoute")

const api = process.env.BASE_URL

router.use(api,authRoute)

module.exports = router