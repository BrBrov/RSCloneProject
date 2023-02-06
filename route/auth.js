const express = require('express');
const parser = require('body-parser');
const crypto = require('crypto');
const router = express.Router();
const register = require('../util/register');
const apiKey = require('../util/apikey');


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
    if (req.query.mode !== 'register') return;

    let login = new Uint8Array(req.body.id.split(','));
    const passChif = new Uint8Array(req.body.data.split(','));
    iv = req.header('authorization').slice(9).split(',');
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

    const reg = await register(login, userPassHash);

    if (reg) {
      crypto.randomFill(new Buffer.alloc(16), async (err, buffer) => {
        if (err) {
          res.status(500);
          res.json({register: 'Cannot create apiKey!'});
          return;
        }
        const token = new Uint8Array(buffer);
        const tokenString = token.join(',');

        const result = await apiKey(login, tokenString);

        if (result) {
          res.status(200);
          const tokenChif = await crypto.webcrypto.subtle.encrypt(
            {
              name: "AES-CBC",
              iv: iv,
            },
            keyAES,
            token
          );

          res.json({register: new Uint8Array(tokenChif).join(',')});
          return;
        }
        res.status(500);
        res.json({register: 'Internal db error!'});
      });
      return;
    }
    res.json({register: 'none'})
  })

module.exports = router;