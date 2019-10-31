const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const db = mongojs('mongodb+srv://nizam:taxi@cluster0-bfjrt.mongodb.net/HeyTaxi?retryWrites=true&w=majority', []);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/driver', (req, res) => {
    db.driver.find({}, (error, docs) => res.json(docs));
})

app.get('/driver/:id', (req, res) => {
    var id = req.params.id;
    db.driver.findOne({ _id: mongojs.ObjectID(id) }, (error, docs) => res.json(docs));
})

app.post('/driver', (req, res) => {
    db.driver.insert(req.body, (error, doc) => res.json(doc));
})

app.put('/driver/:id', (req, res) => {
    var id = req.params.id;
    db.driver.findAndModify({
        query: { _id: mongojs.ObjectID(id) },
        update: { $set: req.body },
        new: true
    }, (error, doc, lastErrorObject) => res.json(doc));
})

app.delete('/driver/:id', (req, res) => {
    var id = req.params.id;
    db.driver.remove({ _id: mongojs.ObjectID(id) }, [true], (error, doc) => res.json(doc));
})

app.listen(port, () => console.log("Listening on port " + port));