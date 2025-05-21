const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/downloader', require("./routes/download.route.js"))


app.get('/', (req, res) => {
    res.json({message:"API is up"})
})

app.listen(process.env.PORT, () => {
    console.log("Server is up")
})