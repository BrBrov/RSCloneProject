const e = require('express');
const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
	let file = path.join(__dirname, '..', './dist/index.html');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send('Main page was not found');
		}
	});
});

router.get('/assets/svg/disc.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/disc.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send('Style was not found');
		}
	})
});

router.get('/index.js', (req, res) => {
	let file = path.join(__dirname, '..', './dist/index.js');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send('Scripts was not found');
		}
	})
});

router.get('/assets/svg/search.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/search.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/hi.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/hi.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/autirized.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/autorized.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/key.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/key.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/git.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/git.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/low.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/low.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/next.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/next.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/play.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/play.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/playlist.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/playlist.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/prev.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/prev.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/svg/stop.svg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/svg/stop.svg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/png/rss.png', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/png/rss.png');
	res.sendFile(file, (err) => {
		if (err) {
			res.status(404);
			res.send(`Not found ${err.message}`);
		}
	})
});

// 

router.get('/assets/img/dance.png', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/dance.png');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/electronic.png', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/electronic.png');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/hip-hop.png', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/hip-hop.png');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/house.png', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/house.png');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/logo.png', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/logo.png');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/lyric.jpg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/lyric.jpg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/popular.jpg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/popular.jpg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});

router.get('/assets/img/rock.jpg', (req, res) => {
	let file = path.join(__dirname, '..', './dist/assets/img/rock.jpg');
	res.sendFile(file, (err) => {
		if (err) {
			res.status('404');
			res.send(`Not found ${err.message}`);
		}
	})
});
module.exports = router;