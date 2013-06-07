var config = require('./config.js');
exports.logger = function(msg, level) {
	if (config.DebugLevel === 1) {
		console.log(msg);
	} else {
		if (level === config.DebugLevel) {
			console.log(msg);
		}
	}
}