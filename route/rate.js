const express = require('express');
const parser = require('body-parser');
const rate = require('../util/rate');
const router = express.Router();


router.route('')
	.get(async (req, res) => {
		let limit = req.query.limit;

		console.log(limit);
		if (!limit) {
			limit = '10';
		}

		const result = await rate.getRate(limit);

		if (!result) {
			res.status(500);
			res.json({tracks: 'DB is fail'});
		}

		res.status(200);
		res.json({tracks: result});
	})
	.post(parser.json(), async (req, res) => {
		let id = req.body.id;

		if (!id) {
			res.status(400);
			res.json({result: null});
			return;
		}

		const result = await rate.setRate(Number(id));

		if (!result) {
			res.status(404);
			res.json({result: false});
			return;
		}

		res.status(200);
		res.json({result: true});
		return;
	})

	module.exports = router;