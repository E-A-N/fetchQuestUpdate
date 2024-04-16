const http = require('http');
const express = require('express');
const app  = express();
const path = require('path');

//open port for game to be played on
let sitePath = "client";
let port = process.argv[2] || 7777;
let address = "http://localhost:";

let gameRoute = path.join(__dirname, sitePath);
gameRoute = path.normalize(gameRoute);

//request logging
app.use( (req, res, next) => {
	console.log(req.url);
	next();
});

app.use(express.static(gameRoute));

app.listen(port, (noArgs) => {
    console.log(`Server running at: ${gameRoute}`);
		console.log(address + port);
});
