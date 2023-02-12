const { MongoClient } = require('mongodb');

async function genre(genre, limit) {
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbMusic');

	const cursorData = await col.aggregate([{$match:{genre: genre}}, {$sample: {size: Number(limit)}}]);

	const tracks = await cursorData.toArray();

	if(tracks.length < 1) {
		client.close();
		return null;
	}

	client.close();
	return tracks;
}

module.exports = genre;