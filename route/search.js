const express = require('express');
const router = express.Router();
const search = require('../util/search');

router.get('', async (req, res) => {
	if (!req.query.string) {
		res.status(401);
		res.json({});
		return;
	}

	const tracks = await search(req.query.string);	

	if (!tracks) {
		res.status(404);
		res.json({ track: 'Not found' });
		return;
	}

	res.status(200);
	res.json(tracks);
})

module.exports = router;