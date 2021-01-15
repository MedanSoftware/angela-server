var fs = require('fs');
var path = require('path');
var cors = require('cors');
var http = require('http');
var https = require('https');
var express = require('express');
var http_error = require('http-errors');
var body_parser = require('body-parser');
var cookie_parser = require('cookie-parser');
var app = express();
var server = http.createServer(app);

r = require('rethinkdb');
rethinkdb = r.connect({ host: 'localhost', port: 28015});
require('events').EventEmitter.defaultMaxListeners = 16;

/**
 * Express middleware
 */
app.use(express.json()); // Init express json
app.use(express.urlencoded({ extended : true })); // Init express url encoded
app.use(body_parser.json());  // Init body parser
app.use(cookie_parser()); // Init cookie parser
app.use(cors({
	origin : function(origin, callback) {
		callback(null, true);
	},
	credentials: true
})); // Init cors

/**
 * Initialize angela
 */
Socketio = require('socket.io')({ path : '/AngelaSocketio' }); // initialize socket.io
Config = require('./application/config/config'); // load config
Logger = require('./system/core/Logger'); // load logger
Angela = require('./system/core/Angela')({
	express : app,
	// db_group : Config.active_database
}); // load system

/**
 * Getting port to listen
 */
var ExpressHTTP = server.listen(process.env.PORT || Config.ports.http);

Socketio.listen(ExpressHTTP); // Socket.io listening on HTTP

if (Config.SSL.enable) {
	if (fs.existsSync(Config.SSL.files.key) && fs.existsSync(Config.SSL.files.cert)) {
		Socketio.listen(https.createServer({
			key : fs.readFileSync(Config.SSL.files.key),
			cert : fs.readFileSync(Config.SSL.files.cert)
		}, app).listen(Config.ports.https)); // Server listening on HTTPS

		Logger.Winston().info('SSL enabled');
	} else {
		Logger.Winston().info('SSL enabled, but certificate file not found');	
	}
} else {
	Logger.Winston().info('SSL disabled');
}

Socketio.on('connect', socket => {
	console.log('Connected Socketio Client ID '+socket.id);
	Socketio.emit('from_server', {oke:'banget'})
});

/**
 * Error handler (404)
 */
app.use((req, res, next) => { 
	next(http_error(404));
});

/**
 * Error handler
 */
app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.json({ status:'error', message:err.message });
});