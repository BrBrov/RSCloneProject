const express = require('express');
const start = require('./route/start');
const music = require('./route/music');
const auth = require('./route/auth');
const login = require('./route/login');
const app = express();

const host = '127.0.0.1';
const port = 8080 || process.env;

app.use(['/', '/style.css', '/script.css'], start);

app.use('/play', music);

app.use('/login', auth);

app.use('/auth', login);

app.listen(port, () => console.log(`${host}:${port}`));
