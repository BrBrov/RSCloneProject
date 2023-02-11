const { MongoClient } = require('mongodb');

async function getKey(id, key) {
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbUser');

  const user = await col.findOne({ "user": id, "pass": key});

  if (!user) {
    const account = await col.findOne({'user': id});
    if (!account) {
      return false;
    }
    return null;
  }

  await client.close();
  return [user.apiKeyArr, user.login];
}

module.exports = getKey;