const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./src/routes/routes.js')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(router)


//db settings start here
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => console.log(error))
db.once('open', () => console.log('DB connected')
)
//db settings finish here


app.listen(process.env.PORT, () => {
    console.log(`listen at port ${process.env.PORT}`)
})