const express = require('express');
const path = require('path');
const router = express.Router();
const getTrack = require('../util/getTrack');

router.route('')
  .get(async (req, res) => {
		if(!req.query.id) {
			res.status(400);
			res.json({});
		}
    console.log(req.query);

    const track = await getTrack(req.query.id);

    if (!track) {
      res.status(404);
      res.json({track: 'Not found'});
      return;
    }

    const trackPath = path.resolve(__dirname, '..', './source/tracks', `${track.file}`);

    res.status(200);
    res.sendFile(trackPath);
  })

module.exports = router;