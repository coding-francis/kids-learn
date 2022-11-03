const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())



mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URI)
    .then(() => console.log('connected to db'))
    .catch((e) => console.error(e))


app.listen(port, () => { console.log(`server has started at port ${port}`) })