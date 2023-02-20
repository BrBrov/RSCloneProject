//Onle for add tracks for DB!!!!!!!!!!!!!!
//Not uncluding this into projet!

const { MongoClient } = require('mongodb');
const dbm = require('./index');

const url = 'mongodb+srv://brbrov:biomed@rsclone.ackgmtt.mongodb.net/test';
let count = 0;

async function add() {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
  const col = db.collection('dbMusic');
	for (const genre in dbm) {
		for (const lette of dbm[genre]) {
			let file = {};
			count++;
			file.id = count;
			file.artist = lette.subtitle;
			file.title = lette.title;
			file.genre = genre;
			if (Array.isArray(lette.hub.actions)) {
				file.file = lette.hub.actions[1].uri;
			}
			file.logo = lette.share.image;
			file.rate = 0;
			await col.insertOne(file);
		}
	}
	await client.close();
}

add();
