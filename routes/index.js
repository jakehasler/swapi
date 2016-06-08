'use strict';
const express = require('express');
let router = express.Router();


// HOME PAGE =========================
router.get('/', function (req, res) {
	let obj = { title: 'Welcome to Swapi!'};
	res.render('index.ejs', obj);
});

// SINGLE CHARACTER BY NAME ==========
router.get('/character/:name', function(req, res) {
	let name = req.params.name;

	if(name) {
		switch(name) {
			case 'luke': 
				console.log('luke');
				res.json({name: 'Luke'});
				break;
			case 'han': 
				console.log('han');
				break;
			case 'leia': 
				console.log('leia');
				break;
			case 'rey': 
				console.log('rey');
				break;
			default: console.log('Not a valid name!'); 
		}
	}

})


// ALL CHARACTERS BY 10'S ===========
router.get('/characters', function(req, res) {
	
})


module.exports = router;