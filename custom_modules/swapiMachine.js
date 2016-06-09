'use strict';
const http = require('http');
const request = require('request');
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
	return new Promise((fulfill, reject) => {
		console.log('totalUrl: ' + baseUrl + totalPath);
		axios.get(baseUrl + totalPath).then(data => {
			console.log('Data Retrieved for Characters!');
			fulfill(data.data);
		}, err => {
			reject(err.data);
		})
	})
}

swapiMachine.getPlanetResidents = () => {
	const path = '/api/people/';
	let totalPath = path + characterId + format;
	return new Promise(function(fulfill, reject) {
		console.log('totalUrl: ' + baseUrl + totalPath);
		axios.get(baseUrl + totalPath).then(data => {
			console.log('Data Retrieved for: ' + data.data.name);
			fulfill(data.data);
		}, err => {
			reject(err.data);
		})
	})
}


module.exports = swapiMachine;