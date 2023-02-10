const express = require('express');
const start = require('./route/start');
const music = require('./route/music');
const auth = require('./route/auth');
const login = require('./route/login');
const tracks = require('./route/tracks');
const random = require('./route/random');
const app = express();

// const host = '127.0.0.1';
const port = 8080 || process.env;

app.use(['/', '/style.css', '/script.css'], start);

app.use('/play', music);

app.use('/login', auth);

app.use('/auth', login);

app.use('/tracks', tracks);

app.use('/random', random);

app.listen(port, () => console.log(`Server on localhost:${port}`));
