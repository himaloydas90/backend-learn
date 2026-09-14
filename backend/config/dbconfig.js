const mongoose = require("mongoose")
const db_url = process.env.DB_URL

const dbconfig = () => {
    mongoose.connect(db_url).then(() => {
        console.log("db conected")

    }).catch((error) => {
        console.log(` db error ${error}`)

    })
}
module.exports = dbconfig