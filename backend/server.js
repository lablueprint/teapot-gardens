require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const programRoutes = require('./routes/programs')
const userRoutes = require('./routes/users')

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/programs', programRoutes)
app.use('/api/users', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

