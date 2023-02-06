const { MongoClient } = require('mongodb');



async function getKey(id, key) {
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbUser');

  const user = await col.findOne({ "user": id, "pass": key});
  console.log('user->', user);

  if (!user) {
    const account = await col.findOne({'user': id});
    if (!account) {
      return false;
    }
    return null;
  }

  await client.close();
  return user.apiKey;
}

module.exports = getKey;