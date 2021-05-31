const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getOne = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
      }
};

exports.post = async (req, res) => {
    try {
        const { day, performer, genre, price, image} = req.body;
        const newCon = new Concert({
            day: day,
            performer: performer,
            genre: genre,
            price: price,
            image: image
        });
        await newCon.save();
        res.json({ message: 'Ok' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.put = async (req, res) => {
    const { day, performer, genre, price, image} = req.body;
    try {
        const editedConcert = await(Concert.findById(req.params.id));
        if(editedConcert) {
            editedConcert.day = day;
            editedConcert.performer = performer;
            editedConcert.genre = genre;
            editedConcert.price = price;
            editedConcert.image = image;
            await editedConcert.save();
            res.json({ editedConcert });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const Concert = await(Concert.findById(req.params.id));
        if(Concert) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ dep });
        }
        else res.status(404).json({ message: 'Not found...'});
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};