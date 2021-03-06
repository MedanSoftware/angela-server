/**
 * App name
 *
 * @type {Object}
 */
module.exports.app = {
	name : 'Angela',
	version : '1.0.0'
}

/**
 * Environment
 *
 * @type {String}
 */
module.exports.environment = 'development';

/**
 * Encryption key
 * @type {String}
 */
module.exports.encryption_key = 'angela';

/**
 * Active database
 *
 * @type {String}
 */
module.exports.active_database = 'default';

/**
 * Auto-loader all files
 *
 * @type {Object}
 */
module.exports.autoloader = {
	helpers : true,
	libraries : true,
	models : true
};

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

/**
 * Web Push
 */
module.exports.webpush = {
	mail_to : 'agungmasda29@gmail.com',
	vapid : {
		public_key : 'BIIQi6cHNvfI4t0UpK461RKXZQ2ZVoLnlGb0rFQKo9kOtnOblhwHi4NzdgN9eKvqlNJ2TVlRiJicKbvG8HZEDX8',
		private_key : '0QYIwhpCdZJxfaArvRzEbZq8J3mj6chrFOQxzC-NaZo'
	}
}