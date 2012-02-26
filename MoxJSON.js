var http = require('http'),
sys = require('sys');
var url = require('url');
var mock = require('./mockData.js');
var svcLog = require('./serviceLog.js');
var errorHandler = require('./error.js');


var server = http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true);
    var id = urlObj.query.id;
    var output = urlObj.query.output;

    var user = 'kgaddy';
    request.addListener('end',
    function() {
		var serviceid = id;
 		mock.getData(serviceid,response,request,output);
    });


}).listen(8000);
console.log('Server Started')