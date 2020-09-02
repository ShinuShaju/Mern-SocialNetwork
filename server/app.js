const express = require('express')
const app = express()
const morgan = require('morgan')


//middleware
app.use(morgan("dev"));

//importing routes middleware
const postRoutes = require('./routes/post.js');

app.use('/', postRoutes);


const port = 8080;
app.listen(port, () => {
    console.log('Node API is listening on port: %d', port);
});