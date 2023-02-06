const express = require('express');
const parser = require('body-parser');
const crypto = require('crypto');
const router = express.Router();
const getKey = require('../util/getKey');

let keyAES;
let iv;

router.use(parser.json());

router.route('')
  .get(async (req, res) => {
    keyAES = await crypto.webcrypto.subtle.generateKey({
      name: 'AES-CBC',
      length: 128
    }, true, ['encrypt', 'decrypt']);

    const exportKey = await crypto.webcrypto.subtle.exportKey("jwk", keyAES);

    res.status(200);
    res.json(exportKey);
  })

  .post(async (req, res) => {
    if (req.query.mode !== 'enter') {
      res.status(404);
      res.json({ token: 'Wrong request!' });
      return;
    };

    let login = new Uint8Array(req.body.id.split(','));
    const passChif = new Uint8Array(req.body.data.split(','));
    iv = req.header('authorization').slice(5).split(',');
    iv = new Uint8Array(iv);

    let userPassHash = await crypto.webcrypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      keyAES,
      passChif
    );

    userPassHash = new Uint8Array(userPassHash);
    userPassHash = userPassHash.join('');
    login = login.join('');

    const apiKey = await getKey(login, userPassHash);

    console.log(apiKey);

    if (!apiKey) {      
      if (apiKey === null){
        res.status(401);
        res.json({ token: 'Wrong passord!' });
        return;
      }
      res.status(403);
      res.json({ token: 'Unregistered!'});
      return;
    }

    const tokenChif = await crypto.webcrypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv
      },
      keyAES,
      new Uint8Array(apiKey.split(','))
    );

    console.log(new Uint8Array(tokenChif));    
    res.status(200);
    res.json({token: new Uint8Array(tokenChif).join(',')});
  })

module.exports = router;