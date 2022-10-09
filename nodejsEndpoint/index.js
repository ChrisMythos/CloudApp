const express = require('express');
var imgModel = require('./model');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var mongodb = require("./mongodb");


const app = express();
const port = 3000;

// save received files in upload folder
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to mongodb
console.log("connecting to db: ");
mongodb.connect();

// get endpoint. all iamges are received from db and returned in response
app.get('/getImages', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            items.forEach(element => {
                console.log("item in images item:");
                console.log(element);
            });
            res.setHeader('Content-Type', 'application/json');
            // TODO: hier noch irgendwie alle items senden, nicht nur eins
            res.end(JSON.stringify(items));
            console.log("items send to requester");
        }
    });
});


// Post endpoint. Images is received here and saved into database
app.post('/uploadImage', upload.single('image'), (req, res, next) => {
    console.log("bin in der upload");

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log("object received:");
    console.log(obj);
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            // item.save();
            res.status(200).send("object was saved to database sucessfully");
        }
    });
});
app.listen(port, () => console.log(`Nodejs endpoint is online and listen to port ${port}!`))