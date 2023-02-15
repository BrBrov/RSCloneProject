const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://vercel-admin-user:mCO59EHkQ0e3MfAQ@rsclone.ackgmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function getPls(user, token) {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const plsDB = db.collection('dbPls');
	const userDB = db.collection('dbUser');
	const musicDB = db.collection('dbMusic');

	const userData = await userDB.findOne({ token: token, user: user });

	if (!userData) {
		client.close();
		return null;
	}

	const idPls = userData.user;

	const pls = await plsDB.findOne({ id: idPls });

	if (!pls) {
		client.close();
		return false;
	}

	return pls;
}

async function addTrack(user, token, idTrack) {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const plsDB = db.collection('dbPls');
	const userDB = db.collection('dbUser');
	const musicDB = db.collection('dbMusic');



	const track = await musicDB.findOne({ "id": Number(idTrack) });

	if (!track) {
		client.close();
		return null;
	}

	const userData = await userDB.findOne({ "apiKey": token, "login": user });

	if (!userData) {
		client.close();
		return null;
	}

	const plsData = await plsDB.findOne({ id: userData.user }); //playlist

	if (plsData) {
		let tracksArr = [].concat(plsData.tracks);
		let songsID = new Set(plsData.songsID);

		if (!songsID.has(Number(idTrack))) {
			tracksArr.push(track);
			songsID.add(track.id);
		}
		songsID = Array.from(songsID);
		const pls = await plsDB.updateOne(plsData, { $set: { tracks: tracksArr, songsID: songsID } });
		if (pls) {
			const playlist = await plsDB.findOne({ id: userData.user });
			client.close();
			return playlist ? playlist : null;
		}
		client.close();
		return null;
	}

	const data = {
		id: userData.user,
		tracks: [track],
		songsID: [track.id]
	}

	const pls = await plsDB.insertOne(data);

	if (!pls) {
		client.close();
		return null;
	}

	const playlist = await plsDB.findOne({ id: userData.user });

	client.close();
	return playlist ? playlist : null;
}

async function deleteTrack(user, token, idTrack) {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const plsDB = db.collection('dbPls');
	const userDB = db.collection('dbUser');

	const userData = await userDB.findOne({ apiKey: token, login: user });

	if (!userData) {
		client.close();
		return null;
	}

	const plsData = await plsDB.findOne({ id: userData.user });

	if (!plsData) {
		client.close();
		return null;
	}

	const tracksArr = plsData.tracks.filter(item => {
		if (item.id !== Number(idTrack)) {
			return item;
		}
	});
	
	const songsIDArr = plsData.songsID.filter(id => {		
		if (id !== Number(idTrack)) {			
			return id;
		}
	});	

	let pls = await plsDB.updateOne({id: userData.user}, {$set:{tracks: tracksArr, songsID: songsIDArr}});

	if (!pls) {
		client.close();
		return null;
	}

	pls = await plsDB.findOne({id: userData.user});

	client.close();
	return pls;
}

async function deletePls(user, token) {
	const client = new MongoClient(url);
	const db = client.db('rsclone');
	const plsDB = db.collection('dbPls');
	const userDB = db.collection('dbUser');

	const userData = await userDB.findOne({ apiKey: token, login: user });

	if (!userData) {
		client.close();
		return null;
	}

	const plsData = await plsDB.findOne({ id: userData.user });

	if (!plsData) {
		client.close();
		return false;
	}

	const result = await plsDB.deleteOne({id: plsData.id});
	client.close();
	return result;
}

module.exports = { getPls, addTrack, deleteTrack, deletePls }