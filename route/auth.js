const express = require('express');
const parser = require('body-parser');
const crypto = require('crypto');
const router = express.Router();
const chifer = require('../util/crypto');
const register = require('../util/register');
const apiKey = require('../util/apikey');


let key;
let iv;

router.use(parser.json());

router.route('')

  .get(async (req, res) => {
    key = await chifer.getKey();

    const exportKey = await chifer.exportKey(key);

    res.status(200);
    res.json(exportKey);
  })

  .post(async (req, res) => {
    if (req.query.mode !== 'register') return;

    let login = new Uint8Array(req.body.id.split(','));
    const passChif = new Uint8Array(req.body.pass.split(','));
    const user = req.body.login;

    iv = req.header('authorization').slice(9).split(',');
    iv = new Uint8Array(iv);

    let userPassHash = await chifer.decript(passChif, key, iv);
    userPassHash = new Uint8Array(userPassHash).join('');
    login = login.join('');

    // console.log('loginHash', login);
    console.log('passHash', userPassHash);

    const reg = await register(login, userPassHash, user);

    if (reg) {
      crypto.randomFill(new Buffer.alloc(16), async (err, buffer) => {
        if (err) {
          res.status(500);
          res.json({register: 'Cannot create apiKey!'});
          return;
        }
        const token = new Uint8Array(buffer);
        const tokenString = token.join(',');
        const keyString = token.join('');

        const result = await apiKey(login, tokenString,keyString );

        if (result) {
          res.status(200);
          const tokenChif = await chifer.encript(token, key, iv);

          let apiToken = new Uint8Array(tokenChif).join(',');

          console.log(apiToken);

          let answer = {};
          answer.register = apiToken,
          answer.user = user
         
          console.log(apiToken);
          res.json(answer);
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