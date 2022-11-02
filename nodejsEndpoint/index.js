const express = require('express');
var imgModel = require('./model');
var bodyParser = require('body-parser');
var cors = require('cors')
var multer = require('multer');
var multerGoogleStorage = require("multer-cloud-storage");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser)
app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.get('/test', (req, res) => {
    res.sendStatus(200).send("yess");
});
// get endpoint. all iamges are received from db and returned in response
app.get('/getImages', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.json(items);
            console.log("items send to requester");
        }
    });
});

app.get('/queryImage', (req, res) => {
    queryString = req.query.queryString;
    imgModel.find({ $or: [{ name: { $regex: queryString } }, { desc: { $regex: queryString } }] }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.json(items);
            console.log("items send to requester");
        }
    });
});


// Post endpoint. Images is received here and saved into database
app.post('/uploadImage', upload.single('img'), (req, res, next) => {
    console.log("bin in der upload");
    console.log("try to save in gcloud data bucket");
    console.log(req.body);
    uploadFromMemory("databuckets1", req.body.name, req.body.img).catch(console.error);
    res.send("okay");

});
app.listen(port, () => console.log(`Nodejs endpoint is online and listen to port ${port}!`))

async function uploadFromMemory(bucketName, destFileName, contents) {
    console.log("bin in der upload TO gcloud function");
    const { Storage } = require('@google-cloud/storage');
    // Creates a client
    const storage = new Storage();
    console.log(bucketName);
    console.log(destFileName);
    console.log(contents);
    await storage.bucket(bucketName).file(destFileName).save(contents);


    console.log(
        `${destFileName} with contents ${contents} uploaded to ${bucketName}.`
    );
}