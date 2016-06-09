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
	// TODO: Send these responses back to the EJS Page.
	if(name) {
		name = name.toLowerCase();
		switch(name) {
			case 'luke': 
				var nameRes = swapiMachine.getNameById('1');
				nameRes.then(nameData => {
					res.render('character.ejs', nameData);
				});
				break;
			case 'han': 
				var nameRes = swapiMachine.getNameById('14');
				nameRes.then(nameData => {
					res.render('character.ejs', nameData);
				});
				break;
			case 'leia': 
				var nameRes = swapiMachine.getNameById('5');
				nameRes.then(nameData => {
					res.render('character.ejs', nameData);
				});
				break;
			case 'rey': 
				var nameRes = swapiMachine.getNameById('85');
				nameRes.then(nameData => {
					res.render('character.ejs', nameData);
				});
				break;
			default: res.status(400).send({ error:'Sorry, Not a valid name!' }); 
		}
	} else res.status(400).send({ error:'Sorry, No name provided!' });
});


// ALL CHARACTERS BY 10'S ===========
router.get('/characters', function(req, res) {
	// Must be able to be sorted by name, mass, or height.
	let sortVal = req.query.sort;

	// HTTP Call here for the characters.
	let charData = swapiMachine.getCharacters();
	charData.then(characters => {
		if(!sortVal) {
			res.json(characters);
		}
		else if(sortVal == 'name' || sortVal == 'mass' || sortVal == 'height') {
			console.log('Sorting results by: ' + sortVal);
			if(sortVal == 'name') {
				characters.sort(function(a,b) {
					return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
				}); 
			} else {
				characters.sort(function(a,b){
				  return (a[sortVal] - b[sortVal]);
				});
			}
			res.json(characters);
		} else {
			res.json({error: 'Invalid sort value provided'});
		}
	})
});

// ALL RESIDENTS PF PLANETS ===========
router.get('/planetresidents', function(req, res) {
	let planetSchema = {
		planetName1: ['CharacterName1', 'CharacterName2'],
		planetName2: ['CharacterName3']
	}

	let planetData = swapiMachine.getPlanetResidents();
	planetData.then(planets => {
		res.json(planets);
	});
});


module.exports = router;