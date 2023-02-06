const { MongoClient } = require('mongodb');



async function register(id, pass) {
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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