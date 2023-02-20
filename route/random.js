const express = require('express');
const router = express.Router();
const getRandomTracks = require('../util/getRandomTracks');

router.get('', async (req, res) => {

	const track = await getRandomTracks(req.query.limit);

	if (!track) {
		res.status(404);
		res.json({ track: 'Not found' });
		return;
	}

	res.status(200);
	res.json(track);
})

module.exports = router;