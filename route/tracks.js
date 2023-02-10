const express = require('express');
const getTracks = require('../util/getTracks');
const route = express.Router();

route.route('')
.get(async (req, res) => {
	const limit = req.query.limit ? req.query.limit : 10;
	const page = req.query.page ? req.query.page : 1;

	const tracks = await getTracks(limit, page);

	if (!tracks) {
		res.status(412);
		res.json({tracks: 'Wrong requst'});
		return;
	}

	res.status(200);
	res.json({tracks: tracks});
})

module.exports = route;