const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
app.use(helmet());

app.use((req, res, next) => {
    req.io = io;
    next();
});

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

const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.4u1uf.mongodb.net/NewWaveDB?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('działa server')
});
db.on('error', err => console.log('Error' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server running on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client on id: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('Disconnected ' + socket.id);
    })
});

module.exports = server;