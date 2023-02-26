const express = require('express');
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

const port = 8080;

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

app.listen(port, () => console.log(`Server on localhost:${port}`));
