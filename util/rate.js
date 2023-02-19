const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function getRate(limit) {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const musicDB = db.collection('dbMusic');

	const songsCur = await musicDB.find({}).sort({'rate': -1}).limit(Number(limit));
	const songs = await songsCur.toArray();

	if (songs.length < 1) {
		client.close();
		return null;
	}

	client.close();
	return songs;
}

async function setRate(id) {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const musicDB = db.collection('dbMusic');

	const result = await musicDB.findOneAndUpdate({'id': Number(id)}, {$inc: {'rate': 1}});

	if(!result.lastErrorObject.updatedExisting) {
		client.close();
		return false;
	}

	client.close();
	return true;
}

module.exports = {getRate, setRate};