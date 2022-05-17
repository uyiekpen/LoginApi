const mongoose = require("mongoose")
const { once } = require("nodemon")

const url = `mongodb://localhost/bootcampDB`

mongoose.connect(url , {
    useNewUrlParser : true
})

mongoose.connection
.on("open", (req, res)=>{
    console.log(`database is ready`)
})

.once("error",(req, res)=>{
    console.log(`database is not connected`)
})

module.exports = mongoose