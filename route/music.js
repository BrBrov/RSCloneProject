const express = require('express');
const router = express.Router();
const getTrack = require('../util/getTrack');

router.route('')
  .get(async (req, res) => {
		if(!req.query.id) {
			res.status(400);
			res.json({});
		}

    const track = await getTrack(req.query.id);

    if (!track) {
      res.status(404);
      res.json({track: 'Not found'});
      return;
    }

    res.status(200);
    res.json(track);
  })

module.exports = router;