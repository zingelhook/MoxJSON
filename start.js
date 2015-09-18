var http = require('http');
var sys = require('util');
var url = require('url');
var mockData = require('./mockData.js');
var svcLog = require('./serviceLog.js');
var errorHandler = require('./error.js');
var log = require('./logger.js');
var server = http.createServer(function (request, response) {
	var urlObj = url.parse(request.url, true);
	var id = urlObj.query.id;
	var output = urlObj.query.output;

	request.on('end',

		function () {
			var serviceid = id;
			log.logger(id, 0);
			mockData.getData(serviceid, response, request, output);
		});
	request.resume();
}).listen(8000);
console.log('Server Started on port:8000')