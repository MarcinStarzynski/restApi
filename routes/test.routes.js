const express = require('express');
const router = express.Router();
let db = require('../db');

router.route('/test').get((req, res) => {
    res.json(db.test);
});

router.route('/test/id').get((req, res) => {
    res.json(db.test[req.params.id]);
});

router.route('/test/random').get((req, res) => {
    let item = db.test[Math.floor(Math.random() * db.test.length )];
    res.json(item);
});

router.route('/test').post((req, res) => {
    const person = {
        id: (db.test.length + 1),//uważam że równie dobrze mogę dodawać element jako ostatni na podstawie długości tablicy, losowanie wprowadza ryzyko pojawienia się dwóch identycznych numerów
        author: req.body.author,
        text: req.body.text,
    }
    db.test.push(person);
    return res.json({
        message: 'ok'
    });
});

router.route('/test/:id').put((req, res) => {
    db.test.forEach(person => {
        if(person.id == req.params.id) {
            person.author = req.body.author;
            person.text = req.body.text;
        }
    });
    return res.json({
        message: 'ok'
    });
});

router.route('/test/:id').delete((req, res) => {
    db.test.forEach(person => {
        if(person.id == req.params.id) {
            const index = db.test.indexOf(person);
            db.test.splice(index, 1);
        }
    });
    return res.json({
        message: 'ok'
    });
});

module.exports = router;