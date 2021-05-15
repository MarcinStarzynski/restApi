const express = require('express');

const app = express();

const testRoutes = require('./routes/test.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testRoutes);
app.use('/', concertRoutes);
app.use('/', seatsRoutes);

app.use((req, res) => {
    return res.json({
        message: 'Not found...'
    });
});

app.listen(7000, () => {
    console.log('Server running on port 7000');
});