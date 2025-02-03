const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 4444;
const path = require('path');
let db;
let collection;

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/anime', (req, res) => {
    collection.find()
})

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    db = client.db(animedb);
    collection = db.collection('anime');
    return 'done.';

}

main()
    .then((msg) => {
        console.log(msg)
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })



