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
    artist: 'O.M.S.K. Phonk',
    title: 'Смешарики',
    year: '2021',
    genre: 'rock',
    file: 'http://cdn15.deliciouspeaches.com/get/cuts/04/84/0484f7d96568e8c70efd655a4bec447a/75371957/Smeshariki_-_OMSK_Phonk_b128f0d92.mp3',
    logo: ''
  })

  await client.close();
}

indexer();