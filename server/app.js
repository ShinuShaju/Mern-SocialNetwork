const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Database Connected!'));

mongoose.connection.on("error", err => {
    console.log('Database Connection Error: %s', err.message);
});

// importing routes middleware
const postRoutes = require('./routes/post.js');
const authRoutes = require('./routes/auth.js');

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', postRoutes);
app.use('/', authRoutes);


const port = process.env.PORT | 8080;
app.listen(port, () => {
    console.log('Node API is listening on port: %d', port);
});


