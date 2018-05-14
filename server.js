const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 5001;
const INDEX = path.join(__dirname, './public', 'index.html');
let cities = require('./public/json/cities.json');
let categories = require('./public/json/categories.json');
let events = require('./public/json/events.json');

const server = express();
server.use(bodyParser.json());
server.use(logger('dev'));
server.use(express.static('public'));

server.get("/", (req, res) => {
    res.sendFile(INDEX);
});
server.get("/getCategories", (req, res, next) => {
    res.status(200).send(categories);
});
server.get("/getCities", (req, res, next) => {
    res.status(200).send(cities);
});
server.get("/getEvents", (req, res, next) => {
    res.status(200).send(events);
});
console.log(categories.categories[1]);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
