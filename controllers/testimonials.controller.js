const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }   
};

exports.getOne = async (req, res) => {
    try {
        const test = await Testimonial.findById(req.params.id);
        if(!test) res.status(404).json({ message: 'Not found' });
        else res.json(test);
    }
    catch(err) {
        res.status(500).json({ message: err });
      }   
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const test = await Testimonial.findOne().skip(rand);
        if(!test) res.status(404).json({ message: 'Not found...' });
        else res.json(test);
    }
    catch(err) {
        res.status(500).json({ message: err });
      }   
}; 

exports.post = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTest = new Testimonial({ 
            author: author,
            text: text
        });
        await newTest.save();
        res.json({ massage: 'OK' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }   
};

exports.put = async (req, res) => {
    const { author, text } = req.body;
    try {
        const test = await(Testimonial.findById(req.params.id));
        if(test) {
            test.author = author;
            test.text = text;
            await test.save();
            res.json({ test });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) =>{
    try {
        const test = await(Testimonial.findById(req.params.id));
        if(test) {
            await Testimonial.deleteOne({ _id: req.params.id });
            res.json({ test });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};