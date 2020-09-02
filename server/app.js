const express = require('express')
const app = express()

//importing routes
const postRoutes = require('./routes/post.js');

app.get('/', postRoutes.getPosts);


const port = 8080;
app.listen(port, () => {
    console.log('Node API is listening on port: %d', port);
});