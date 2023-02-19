const express = require('express');
const cors = require('cors');
const start = require('./route/start');
const music = require('./route/music');
const auth = require('./route/auth');
const login = require('./route/login');
const tracks = require('./route/tracks');
const random = require('./route/random');
const search = require('./route/search');
const playlist = require('./route/playlist');
const genre = require('./route/genre');
const rate = require('./route/rate');
const app = express();

const host = '127.0.0.1';
const port = 8081 || process.env;

app.use(cors());

app.use('', start);

app.use('/play', music);

app.use('/login', auth);

app.use('/auth', login);

app.use('/tracks', tracks);

app.use('/random', random);

app.use('/search', search);

app.use('/playlist', playlist);

app.use('/style', genre);

app.use('/rate', rate);

app.listen(port, host, () => console.log(`Server on localhost:${port}`));
