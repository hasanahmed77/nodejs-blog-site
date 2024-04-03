require('dotenv').config()
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const express = require('express')
const blogRoutes = require('../routes/blogs')
const mongoose = require('mongoose')

// Express app
const app = express()

// Middlewire
app.use(express.json())

// Routes
app.use("/create", blogRoutes)

// Test
app.get("/", (req, res) => res.send("Express on Vercel"));

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

module.exports = app