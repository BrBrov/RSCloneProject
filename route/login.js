const express = require('express');
const parser = require('body-parser');
const crypto = require('crypto');
const chifer = require('../util/crypto');
const router = express.Router();
const getKey = require('../util/getKey');

let key;
let iv;

router.use(parser.json());

router.route('')
  .get(async (req, res) => {
    key = await chifer.getKey();

    const keyExport = await chifer.exportKey(key);

    res.status(200);
    res.json(keyExport);
  })

  .post(async (req, res) => {
    if (req.query.mode !== 'enter') {
      res.status(404);
      res.json({ token: 'Wrong request!' });
      return;
    };

    const loginChif = new Uint8Array(req.body.id.split(','));
    const passChif = new Uint8Array(req.body.data.split(','));

    iv = req.header('authorization').slice(5).split(',');
    iv = new Uint8Array(iv);

    let userPassHash = await chifer.decript(passChif, key, iv);
    let loginHash = await chifer.decript(loginChif, key, iv);

    userPassHash = new Uint8Array(userPassHash).join('');
    loginHash = new Uint8Array(loginHash).join('');

    const apiKey = await getKey(loginHash, userPassHash);

    if (!apiKey) {
      if (apiKey === null) {
        res.status(401);
        res.json({ token: 'Wrong passord!' });
        return;
      }
      res.status(403);
      res.json({ token: 'Unregistered!' });
      return;
    }

    console.log(apiKey[0]);

    const apiKeyArrBuf = new Uint8Array(apiKey[0].split(','));
    const tokenChif = await chifer.encript(apiKeyArrBuf, key, iv);

    res.status(200);
    res.json({
      token: new Uint8Array(tokenChif).join(','),
      login: apiKey[1]
    });
  })

module.exports = router;