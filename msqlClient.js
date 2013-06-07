var config = require('./config.js');
var log = require('./logger.js');
exports.client = new require("mysql").createClient({
	host: 'localhost',
	port: config.MYSQLport,
	user: config.MYSQLusername,
	password: config.MYSQLpassword,
	database: config.MYSQLdbname
});


exports.ClientConnectionReady = function(client, callback) {
	client.query('USE mockJSON',

	function(error, results) {
		if (error) {
			log.logger('ClientConnectionReady Error: ' + error.message);
			client.end();
			return;
		}
		callback();
	});

	log.logger('MSQL connection made');
};