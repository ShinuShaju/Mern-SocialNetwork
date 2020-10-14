const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
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
const userRoutes = require('./routes/user.js');

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
    if(err) {
      res.status(400).json ({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized User!"});
    }
  });

const port = process.env.PORT | 8080;
app.listen(port, () => {
    console.log('Node API is listening on port: %d', port);
});


