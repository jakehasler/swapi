# node-exercise
My submission for the Star Wars API [https://swapi.co/](https://swapi.co/) exercise.

## Installation
Run `npm install --production` to avoid installing the dev dependencies.

## Usage
Run `npm start` and then navigate to localhost:4000 to see the home screen.

## Endpoints
Navigate to `/character/:name` with the names *han*, *leia*, *luke*, or *rey* to see thier information.
Navigate to `/characters` to see a raw JSON list of 50 Star Wars characters.
* Can be sorted by the query `?sort=` with the options of *height*, *mass*, or *name*.
Navigate to `/planetresidents` to see a raw JSON list of the planets with their residents..
