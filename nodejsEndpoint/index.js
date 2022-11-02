const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');
const { Firestore } = require('@google-cloud/firestore');

const uploadHandler = multer({ storage: multer.memoryStorage() });
const bucket = new Storage().bucket('databuckets2');
const fileCollection = new Firestore().collection('files');

const app = express();
app.use(cors());

async function getFiles() {
    const files = [];
    const fileRefs = await fileCollection.listDocuments();
    for (const fileRef of fileRefs) {
        const file = await fileRef.get();
        if (!file.exists) {
            continue;
        }
        const bucketKey = file.get('bucketKey');
        const contents = await bucket.file(bucketKey).download();
        files.push({
            name: file.get('name'),
            desc: file.get('desc'),
            img: {
                data: contents[0].toString('base64'),
                contentType: 'img/png',
            },
        });
    }
    return files;
}

// get endpoint. all iamges are received from db and returned in response
app.get('/getImages', async (req, res) => {
    res.json(await getFiles());
});

app.get('/queryImage', async (req, res) => {
    const query = req.query.queryString;
    const files = await getFiles();
    const filteredFiles = files.filter(file => file.name.toLowerCase().includes(query));
    res.json(filteredFiles);
});

// Post endpoint. Images is received here and saved into database
app.post('/uploadImage', uploadHandler.single('img'), async (req, res, next) => {
    const bucketKey = uuidv4();
    await Promise.all([
        bucket.file(bucketKey).save(req.file.buffer),
        fileCollection.add({
            name: req.body.name,
            desc: req.body.desc,
            bucketKey,
        }),
    ]);
    res.send('okay');
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Nodejs endpoint is online and listen to port ${port}!`));
