const express = require('express');
const parser = require('body-parser');
const pls = require('../util/playlist');
const router = express.Router();

router.route('')
	.get(async (req, res) => {
		let user = req.query.user;
		let token = req.query.token;

		const playlist = await pls.getPls(user, token);
		if (!playlist) {
			if (playlist !== null) {
				res.status(500);
				res.json({ pls: 'Playlist is apson!' });
				return;
			}

			res.status(404);
			res.json({ pls: 'Not found!' });
			return;
		}

		res.status(200);
		res.json({ pls: playlist });
	})
	.post(parser.json() ,async (req, res) => {
		let user = req.query.user;
		let token = req.query.token;
		let idTrack = req.body.id;
		const result = await pls.addTrack(user, token, idTrack);

		if (!result) {
			if (result === null) {
				res.status(500);
				res.json({ pls: 'Internal server error!' });
				return;
			}

			res.status(404);
			res.json({ pls: 'Not found!' });
		}

		res.status(200);
		res.json({ pls: result });
	})
	.put(parser.json(), async (req, res) => {
		let user = req.query.user;
		let token = req.query.token;
		let idTrack = req.body.id;

		const result = await pls.deleteTrack(user, token, idTrack);

		if (!result) {
			if (result === null) {
				res.status(500);
				res.json({ pls: 'Internal server error!' });
				return;
			}

			res.status(404);
			res.json({ pls: 'Not found!' });
		}

		res.status(200);
		res.json({ pls: result });
	})
	.delete(async (req, res) => {
		let user = req.query.user;
		let token = req.query.token;

		const result = await pls.deletePls(user, token);

		if (!result) {
			if (result === null) {
				res.status(500);
				res.json({ pls: 'Internal server error!' });
				return;
			}

			res.status(404);
			res.json({ pls: 'Not found!' });
			return;
		}

		res.status(200);
		res.json({ pls: 'Done' });
	})

module.exports = router;