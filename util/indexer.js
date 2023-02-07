//Onle for add tracks for DB!!!!!!!!!!!!!!
//Not uncluding this into projet!

const {music} = require('./musicDB.json');

const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://brbrov:biomed@rsclone.ackgmtt.mongodb.net/test';
const client = new MongoClient(url);

async function indexer() {  

  const db = client.db('rsclone');
  const col = db.collection('dbMusic');

  await col.insertMany(music);

  await client.close();
}

indexer();