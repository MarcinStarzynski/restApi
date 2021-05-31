const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getOne =  async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.post =  async (req, res) => {
    try {
        const { day, seat, client, email} = req.body;
        const takenSeat = await Seat.findOne({ seat: seat, day: day });
        if(takenSeat) {
            throw e
        } else {
            const newSeat = new Seat({
                day: day,
                seat: seat,
                client: client,
                email: email
            });
            await newSeat.save();
            req.io.emit('seatsUpdated', (await Seat.find()));
            res.json({ message: 'Ok' });
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.put = async (req, res) => {
    const { day, seat, client, email} = req.body;
    try {
        const editedSeat = await(Seat.findById(req.params.id));
        if(editedSeat) {
            editedSeat.day = day;
            editedSeat.seat = seat;
            editedSeat.client = client;
            editedSeat.email = email;
            await editedSeat.save();
            res.json({ editedSeat });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const seat = await(Seat.findById(req.params.id));
        if(seat) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ dep });
        }
        else res.status(404).json({ message: 'Not found...'});
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};