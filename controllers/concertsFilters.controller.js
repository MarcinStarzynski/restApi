const Concert = require('../models/concerts.model');

exports.getByPerformer = async (req, res) => {
    try {
        const con = await Concert.find({ performer: req.params.performer });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getByGenre = async (req, res) => {
    try {
        const con = await Concert.find({ genre: req.params.genre });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getByPrice = async (req, res) => {
    try {
        const con = await Concert.find({ price : {
            $gte: req.params.price_min, 
            $lte: req.params.price_max} 
        });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getByDay = async (req, res) => {
    try {
        const con = await Concert.find({ day: req.params.day });
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};