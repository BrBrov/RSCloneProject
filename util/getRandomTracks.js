const { MongoClient } = require('mongodb');

async function getRandomTracks(limit) {
	if (limit <= 0) limit = 10;
	const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const col = db.collection('dbMusic');

	const cursorData = await col.aggregate([{$sample: {size: Number(limit)}}]);

	if (!cursorData) {
		return null;
	}

	const tracks = await cursorData.toArray();

	await client.close();
	return tracks;
}

module.exports = getRandomTracks;