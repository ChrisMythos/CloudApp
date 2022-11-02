const express = require('express');
var imgModel = require('./model');
var bodyParser = require('body-parser');
var cors = require('cors')
var multer = require('multer');
const app = express();
const port = process.env.PORT;
const { Storage } = require('@google-cloud/storage');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.get('/test', (req, res) => {
    res.sendStatus(200).send("yess");
});
// get endpoint. all iamges are received from db and returned in response
app.get('/getImages', async(req, res) => {
    const contents = await downloadAllImages("databuckets1");
    res.send(contents);
});

app.get('/queryImage', async (req, res) => {
    queryString = req.query.queryString;
    const contents = await downloadIntoMemory("databuckets1",queryString).catch(console.error);
    res.send(contents);
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
async function downloadIntoMemory(bucketName,fileName) {

    // Creates a client
    const storage = new Storage();
    // Downloads the file into a buffer in memory.
    const contents = await storage.bucket(bucketName).file(fileName).download();
    console.log(
        `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
    );
    return contents;
}
async function downloadAllImages(bucketName) {

    // Creates a client
    const storage = new Storage();
    // Downloads the file into a buffer in memory.
    const contents = await storage.bucket(bucketName).getFiles();
    console.log(
        `Contents of gs://${bucketName} are ${contents.toString()}.`
    );
    return contents;
}