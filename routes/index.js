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
				res.json({name: 'Han'});
				break;
			case 'leia': 
				console.log('leia');
				res.json({name: 'Leia'});
				break;
			case 'rey': 
				console.log('rey');
				res.json({name: 'Rey'});
				break;
			default: res.status(400).json({ error:'Sorry, Not a valid name!' }); 
		}
	}
});


// ALL CHARACTERS BY 10'S ===========
router.get('/characters', function(req, res) {
	// Must be able to be sorted by name, mass, or height.
	let sortVal = req.query.sort;
	let characters = ['test1','test2','test3'];

	// HTTP Call here for the characters. 
	
	if(!sortVal) {
		res.json(characters);
	}
	else if(sortVal == 'name' || sortVal == 'mass' || sortVal == 'height') {
		characters.sort(function(a,b){
		  return (b[sortVal] - a[sortVal]);
		});
	} else {
		res.json({error: 'Invalid sort value provided'});
	}
});

// ALL RESIDENTS PF PLANETS ===========
router.get('/planetresidents', function(req, res) {
	let planets = {
		planetName1: ['CharacterName1', 'CharacterName2'],
		planetName2: ['CharacterName3']
	}

	res.send(planets);
});


module.exports = router;