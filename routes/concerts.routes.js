const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');
const ConcertFilterController = require('../controllers/concertsFilters.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getOne);

router.post('/concerts', ConcertController.post);

router.put('/concerts/:id', ConcertController.put);

router.delete('/concerts/:id', ConcertController.delete);

router.get('/concerts/performer/:performer', ConcertFilterController.getByPerformer);

router.get('/concerts/genre/:genre', ConcertFilterController.getByGenre);

router.get('/concerts/price/:price_min/:price_max', ConcertFilterController.getByPrice);

router.get('/concerts/day/:day', ConcertFilterController.getByDay);

module.exports = router;