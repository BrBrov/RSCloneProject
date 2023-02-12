const express = require('express');
const getGenre = require('../util/genre');
const router = express.Router();

router.get('', async (req, res) =>{
	const genre = req.query.genre;
	let limit = req.query.limit;

	if(!genre) {
		res.status(401);
		res.json({tracks: 'Wrong genre param!'});
		return;
	}

	if(!limit) {
		limit = '10';
	}

	const tracks = await getGenre(genre, limit);
	
	if(!tracks) {
		res.status(404);
		res.json({tracks: 'Not found tracks with your genre'});
		return;
	}
	
	res.status(200);
	res.json({tracks: tracks});
})

module.exports = router;