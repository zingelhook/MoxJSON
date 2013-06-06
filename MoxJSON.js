var http = require('http');
var sys = require('util');
var url = require('url');
var mockData = require('./mockData.js');
var svcLog = require('./serviceLog.js');
var errorHandler = require('./error.js');
var server = http.createServer(function(request, response) {
	var urlObj = url.parse(request.url, true);
	var id = urlObj.query.id;
	var output = urlObj.query.output;
	//var user = 'kgaddy';
	request.addListener('end',

	function() {
		var serviceid = id;
		mockData.getData(serviceid, response, request, output);
	});
}).listen(8000);
console.log('Server Started on port:8000')