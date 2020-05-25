var fs = require('fs');

/**
 * App name
 * @type {Object}
 */
module.exports.app = {
	name : 'Angela',
	version : '1.0.0'
}

/**
 * Active database
 * 
 * @type {String}
 */
module.exports.active_database = 'default';

/**
 * Ports setting
 * 
 * @type {Object}
 */
module.exports.ports = {
	http : 8081,
	https : 8082
}

/**
 * SSL setting
 * 
 * @type {Object}
 */
module.exports.SSL = {
	enable : false,
	files : {
		key : __dirname+'/../../ssl_cert/my-domain.com/server.key',
		cert : __dirname+'/../../ssl_cert/my-domain.com/server.key'
	}
}