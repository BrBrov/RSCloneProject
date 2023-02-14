const express = require('express');
const getGenre = require('../util/genre');
const router = express.Router();

router.get('', async (req, res) =>{
	const genre = req.query.genre;
	let limit = Number(req.query.limit);
	let page = Number(req.query.page);

	if(!genre) {
		res.status(401);
		res.json({tracks: 'Wrong genre param!'});
		return;
	}

	if (page < 0) {
		page = 0;
	}

	if (page >= 1) {
		page = page - 1;
	}

	if(!limit) {
		limit = 10;
	}

	const tracks = await getGenre(genre, page, limit);
	
	if(!tracks) {
		res.status(404);
		res.json({tracks: 'Not found tracks with your genre'});
		return;
	}
	
	res.status(200);
	res.json({tracks: tracks});
})

module.exports = router;