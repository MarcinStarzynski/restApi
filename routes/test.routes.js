const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/test', TestimonialController.getAll);

router.get('/test/:id', TestimonialController.getOne);

router.get('/test/random', TestimonialController.getRandom);

router.post('/test', TestimonialController.post);

router.put('/test/:id', TestimonialController.put);

router.delete('/test/:id', TestimonialController.delete);

module.exports = router;