const { MongoClient } = require('mongodb');

async function search(query) {
	debugger;
  const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const db = client.db('rsclone');
  const col = db.collection('dbMusic');
	await col.createIndex({
		'artist': 'text',
		'title': 'text',
		'genre': 'text'
	})
  const cursor = await col.find({ $text: { $search: query }});
	
	let result = await cursor.toArray();  

  if (!result.length) {
    result = null;
  }

  await client.close();
  return result;
}

module.exports = search;