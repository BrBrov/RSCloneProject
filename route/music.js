const express = require('express');
const router = express.Router();

router.route('')
    .get((req, res) => {
        console.log(req.query);
        res.status(200);
        let param = req.query;
        res.send(param.token);
    })

module.exports = router;