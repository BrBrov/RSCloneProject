const { MongoClient } = require('mongodb');



async function apiKey(id, key, keyString) {
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbUser');

  const user = await col.findOne({ user: id });

  if (!user) {
    return false;
  }

  await col.updateOne({ user: id },
    {
      $set: { apiKeyArr: key,
              apiKey: keyString}
    })

  await client.close();
  return true;
}

module.exports = apiKey;