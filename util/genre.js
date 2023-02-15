const { MongoClient } = require('mongodb');

async function genre(genre, page, limit) {
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const musicDB = db.collection('dbMusic');

	// const cursorData = await musicDB.aggregate([{$match:{genre: genre}}, {$sample: {size: Number(limit)}}]);
	const count = await musicDB.find({$text: {$search: genre}});
	let len = await count.toArray();

	const cursorData = await musicDB.find({genre: genre}, { skip: Number(page) * limit, limit: Number(limit) + 1 });

	const tracks = await cursorData.toArray();

	if(tracks.length < 1) {
		client.close();
		return null;
	}

	client.close();
	return {tracks: tracks,
		count: len.length};
}

module.exports = genre;