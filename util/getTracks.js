const { MongoClient } = require('mongodb');

async function getTracks(limit, page) {
	if (page <= 0) return page = 1;
	if (limit <= 0) limit = 10;
	let skip = page === 1 ? 0 : ((page - 1) * limit);
	const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const col = db.collection('dbMusic');

	const cursorData = await col.find({}, { skip: skip, limit: Number(limit) + 1 });

	if (!cursorData) {
		return null;
	}

	const tracks = await cursorData.toArray();



	await client.close();
	return tracks;
}

module.exports = getTracks;