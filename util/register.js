const { MongoClient } = require('mongodb');



async function register(id, pass) {
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbUser');

  const user = await col.findOne({ user: id });

  if (user) {
    return false;
  }

  await col.insertOne({
    user: id,
    pass: pass,
    name: '',
    gender: '',
    bithday: '',
    avatar: '',
    apiKey: '',
    expired: ''
  })

  await client.close();
  return true;
}

module.exports = register;