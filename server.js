const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const testRoutes = require('./routes/test.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
  

app.use((req, res) => {
    return res.json({
        message: 'Not found...'
    });
});

app.listen(process.env.PORT || 7000, () => {
    console.log('Server running on port 7000');
});