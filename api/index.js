const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/downloader', require("./routes/download.route.js"))


app.get('/', (req, res) => {
    res.json({message:"API is up"})
})

app.listen(process.env.PORT, () => {
    console.log("Server is up")
})