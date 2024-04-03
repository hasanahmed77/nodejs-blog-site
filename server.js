require('dotenv').config()

const express = require('express')
const blogRoutes = require('./routes/blogs')
const mongoose = require('mongoose')

// Express app
const app = express()

// Middlewire
app.use(express.json())

// routes
app.use(blogRoutes)

// Connect to DB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 