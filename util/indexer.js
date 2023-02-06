//Onle for add tracks for DB!!!!!!!!!!!!!!
//Not uncluding this into projet!
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://brbrov:biomed@rsclone.ackgmtt.mongodb.net/test';
const client = new MongoClient(url);

async function indexer() {  

  const db = client.db('rsclone');
  const col = db.collection('dbMusic');

  await col.insertOne({
    id: '1',
    artist: 'Бахыр Компот',
    title: 'Драконы победят',
    year: '2021',
    genre: 'rock',
    file: '1.mp3',
    logo: ''
  })

  await client.close();
}

indexer();