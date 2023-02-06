const { MongoClient } = require('mongodb');



async function apiKey(id, key) {
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbUser');

  const user = await col.findOne({ user: id });

  if (!user) {
    return false;
  }

  await col.updateOne({ user: id },
    {
      $set: { apiKey: key }
    })

  await client.close();
  return true;
}

module.exports = apiKey;