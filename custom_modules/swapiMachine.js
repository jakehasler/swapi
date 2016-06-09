'use strict';
const axios = require('axios');
const Promise = require('promise');
const ProgressBar = require('progress');
const baseUrl = 'http://swapi.co';
const format = '?format=json';

let swapiMachine = {};

swapiMachine.getNameById = (characterId) => {
	const path = '/api/people/';
	let totalPath = path + characterId + format;
	return new Promise((fulfill, reject) => {
		console.log('Getting Character...');
		axios.get(baseUrl + totalPath).then(data => {
			console.log('Data Retrieved for: ' + data.data.name);
			fulfill(data.data);
		}, err => {
			reject(err.data);
		})
	})
}

swapiMachine.getCharacters = () => {
	const path = '/api/people';
	let totalPath = path + format;
	let characters = [];
	return new Promise((fulfill, reject) => {
		console.log('Getting Characters....');
		function getCharacterData(url, done) {
			axios.get(url).then(data => {
				let res = data.data;
				let nextUrl = res.next;
				res.results.forEach(character => {
					if(characters.length < 50) {
						characters.push(character);
					} else {
						done(characters);
					}
				});
				// calls itself until there are 50 characters in the array
				if(nextUrl && characters.length < 50) {
					getCharacterData(nextUrl, done);
				} else {
					done(characters);
				}
			}, err => {
				reject(err.data);
			})
		}

		// Callback for success case
		function done(characters) {
			console.log('Finished!');
			fulfill(characters);
		}

		getCharacterData(baseUrl + totalPath, done);

	})
}

swapiMachine.getPlanetResidents = () => {
	const path = '/api/planets/';
	let totalPath = path + format;
	let planets = [];
	let planetIndex = 0;
	let currPlanet = {};
	let resIndex = 0;
	var residentNames = [];
	var bar;
	return new Promise(function(fulfill, reject) {
		console.log('Getting all planets....');

		function getPlanetData(url, getCharactersForPlanets) {
			axios.get(url).then(data => {
				let res = data.data;
				let nextUrl = res.next;
				res.results.forEach(planet => {
					planets.push(planet);
				});
				// calls itself until there are all planets are in the array
				if(nextUrl) {
					getPlanetData(nextUrl, getCharactersForPlanets);
				} else {
					console.log('Getting Characters for Each Planet...');
					currPlanet = planets[planetIndex];
					bar = new ProgressBar('  Processing [:bar] :percent :etas', {
						complete: '=',
						incomplete: ' ',
						width: 50,
						total: planets.length
					});
					getCharactersForPlanets(doneWithResidents);
				}
			}, err => {
				reject(err.data);
			})
		}
		
		function getCharactersForPlanets(doneWithResidents) {
			var residentUrls = currPlanet.residents;
			//console.log('ResidentURLs.length: ', residentUrls.length);
			//console.log(residentUrls[resIndex]);
			if(residentUrls[resIndex]) {
				axios.get(residentUrls[resIndex]).then(data => {
					let res = data.data;
					if(res.name) {
						residentNames.push(res.name);
					}
					if(resIndex < residentUrls.length - 1) {
						resIndex++;
						getCharactersForPlanets(doneWithResidents)
					} else if(resIndex == residentUrls.length - 1) {
						currPlanet.residentNames = residentNames;
						doneWithResidents();
					}
				}, err => {
					reject(err.data);
				})
			} else {
				doneWithResidents();
			}
		}

		function doneWithResidents() {
			if(planetIndex < planets.length - 1) {
				//console.log('Moving on to next planet...' + (planetIndex + 1) + '/' + planets.length);
				bar.tick();
				planetIndex++;
				currPlanet = planets[planetIndex];
				residentNames = [];
				resIndex = 0;
				getCharactersForPlanets(doneWithResidents);
			} else {
				// Build newPlanet Object
				let newPlanets = {};
				bar.tick();
				console.log();
				console.log('Finished Processing Planets!');
				// Finishing up Total Request
				planets.forEach(planet => {
					newPlanets[planet.name] = planet.residentNames;
				});
				fulfill(newPlanets);
			}
		}

		getPlanetData(baseUrl + totalPath, getCharactersForPlanets);
	})
}


module.exports = swapiMachine;