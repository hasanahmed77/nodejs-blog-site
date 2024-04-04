require('dotenv').config()
const path = require('path');
const dotenv = require('dotenv');
const express = require('express')
const blogRoutes = require('../routes/blogs')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Loading Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, '../blog.yaml'));

// Express app
const app = express()

// Middlewire
app.use(express.json())

// Routes
app.use("/create", blogRoutes)

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test
// app.get("/", (req, res) => res.send("Express on Vercel"));

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