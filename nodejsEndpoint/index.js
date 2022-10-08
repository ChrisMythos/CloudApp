const express = require('express');

var mongodb = require("./mongodb");
const app = express();
const port = 3000;
app.get('/upload', (req, res) => {
    res.send('upload endpoint');
    mongodb.connect();

});
app.get('/get', (req, res) => {
    res.send('get endpoint');
});
app.listen(port, () => console.log(`Nodejs endpoint is online and listen to port ${port}!`))