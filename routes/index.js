'use strict';
const express = require('express');
let router = express.Router();
let swapiMachine = require('../custom_modules/swapiMachine');


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
				var nameRes = swapiMachine.getNameById('1');
				nameRes.then(nameData => {
					res.json(nameData);
				});
				break;
			case 'han': 
				var nameRes = swapiMachine.getNameById('14');
				nameRes.then(nameData => {
					res.json(nameData);
				});
				break;
			case 'leia': 
				var nameRes = swapiMachine.getNameById('5');
				nameRes.then(nameData => {
					res.json(nameData);
				});
				break;
			case 'rey': 
				var nameRes = swapiMachine.getNameById('85');
				nameRes.then(nameData => {
					res.json(nameData);
				});
				break;
			default: res.status(400).send({ error:'Sorry, Not a valid name!' }); 
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