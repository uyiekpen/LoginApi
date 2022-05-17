require("./Db")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const link = require("./Router")
const port = 3033
const app = express()

app.use(express.json())
app.use("/", link)
app.use(cors())


app.listen(port ,()=>{
    console.log(`port is listening ${port}`)
})