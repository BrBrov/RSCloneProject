const e = require('express');
const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
  let file = path.join(__dirname, '..', './dist/index.html');
  res.sendFile(file, (err) => {
    if (err) {
      res.status('404');
      res.send('Main page was not found');
    }
  });
});

router.get('/style.css', (req, res) => {
  let file = path.join(__dirname, '..', './dist/style.css');
  res.sendFile(file, (err) => {
    if (err) {
      res.status('404');
      res.send('Style was not found');
    }
  })
});

router.get('/script.js', (req, res) => {
  let file = path.join(__dirname, '..', './dist/script.js');
  res.sendFile(file, (err) => {
    if (err) {
      res.status('404');
      res.send('Scripts was not found');
    }
  })
});

module.exports = router;