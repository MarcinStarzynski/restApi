const express = require('express');
const router = express.Router();
let db = require('../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats[req.params.id]);
});

router.route('/seats').post((req, res) => {
    const seat = {
        id: (db.seats.length + 1),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    }
    if(db.seats.some(selectedSeat => (selectedSeat.day == req.body.day && selectedSeat.seat == req.body.seat))) {
        return res.status(409).send('This seat is taken');
    } else {
        db.seats.push(seat);
        return res.json({
        message: 'ok'
        });
    }
});

router.route('/seats/:id').put((req, res) => {
    db.seats.forEach(seat => {
        if(seat.id == req.params.id) {
            seat.day = req.body.day;
            seat.seat = req.body.seat;
            seat.client = req.body.client;
            seat.email = req.body.email;
        }
    });
    return res.json({
        message: 'ok'
    });
});

router.route('/seats/:id').delete((req, res) => {
    db.seats.forEach(seat => {
        if(seat.id == req.params.id) {
            const index = db.seats.indexOf(seat);
            db.seats.splice(index, 1);
        }
    });
    return res.json({
        message: 'ok'
    });
});

module.exports = router;