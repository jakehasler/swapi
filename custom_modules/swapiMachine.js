'use strict';
const axios = require('axios');
const Promise = require('promise');
const baseUrl = 'http://swapi.co';
const format = '?format=json';

let swapiMachine = {};

swapiMachine.getNameById = (characterId) => {
	const path = '/api/people/';
	let totalPath = path + characterId + format;
	return new Promise((fulfill, reject) => {
		console.log('totalUrl: ' + baseUrl + totalPath);
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
		
		function getPagedData(url, done) {
			axios.get(url).then(data => {
				console.log('Data Retrieved');
				var res = data.data;
				var nextUrl = res.next;
				res.results.forEach(character => {
					if(characters.length < 50) {
						characters.push(character);
					} else {
						done(characters);
					}
				});
				if(nextUrl && characters.length < 50) {
					console.log('Making next call on: ' + nextUrl);
					getPagedData(nextUrl, done);
				} else {
					done(characters);
				}
			}, err => {
				reject(err.data);
			})
		}

		function done(characters) {
			fulfill(characters);
		}

		getPagedData(baseUrl + totalPath, done);

	})
}

swapiMachine.getPlanetResidents = () => {
	const path = '/api/planets/';
	let totalPath = path + format;
	return new Promise(function(fulfill, reject) {
		console.log('totalUrl: ' + baseUrl + totalPath);
		axios.get(baseUrl + totalPath).then(data => {
			console.log('Data Retrieved for Planets!');
			fulfill(data.data);
		}, err => {
			reject(err.data);
		})
	})
}

function makeRequest(url) {
	console.log('Making request on: ' + url);
	return new Promise((fulfill, reject) => {
		axios.get(url).then(data => {
			console.log('Data Retrieved');
			fulfill(data.data);
		}, err => {
			reject(err.data);
		})
	})
}


module.exports = swapiMachine;