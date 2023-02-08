const { MongoClient } = require('mongodb');



async function getTrack(id) {
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbMusic');

  const track = await col.findOne({id: Number(id)});

	console.log(track);

  if (!track) {
    return null;
  }

  await client.close();
  return track;
}

module.exports = getTrack;