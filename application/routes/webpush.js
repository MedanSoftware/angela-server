var fs = require('fs');
var os = require('os');
var Joi = require('@hapi/joi');
var fcm = require('fcm-notification');
var moment = require('moment');
let uuidv3 = require('uuid/v3');
var webpush = require('web-push');
var router = require('express').Router();
var router_path = '/webpush';
var node_schedule = require('node-schedule');

var Online = {
	anonymous : new Array(),
	device : new Array(),
	user : new Array(),
	store : new Array(),
	socket_session : new Array(),
	socket_session_unique : new Array(),
	identify_schema : Joi.object({
		identify : Joi.object({
			device : Joi.object({
				id : Joi.string().hex().required(),
				type : Joi.string().required(),
				platform : Joi.string().required(),
				vendor : Joi.string().optional(),
				model : Joi.string().optional(),
				is_browser : Joi.boolean().required()
			}).required(),
			browser : 
				Joi.when('device.is_browser',{
				is : true,
				then : Joi.object({
					id : Joi.string().hex().required(),
					text : Joi.string().required(),
					name : Joi.string().required(),
					version : Joi.string().required(),
					is_private : Joi.boolean().required()
				}).required()
			}),
			coordinate : Joi.object().required(),
			webpush : Joi.object().required(),
			user_agent : Joi.string().required(),
			os : Joi.object({
				text : Joi.string().required(),
				name : Joi.string().required(),
				version : Joi.string().required()
			}).required(),
			public_ip : Joi.string().optional()
		}).required(),
		on_page : Joi.string().required()
	})
}

let publicKey = 'BIIQi6cHNvfI4t0UpK461RKXZQ2ZVoLnlGb0rFQKo9kOtnOblhwHi4NzdgN9eKvqlNJ2TVlRiJicKbvG8HZEDX8';
let privateKey = '0QYIwhpCdZJxfaArvRzEbZq8J3mj6chrFOQxzC-NaZo';
let mailTO = 'agungmasda29@gmail.com';

router.get('/', (req, res, next) => {
	res.json({
		status:'success',
		data:{publicKey:publicKey}
	});
}).get('/generate_key', (req, res, next) => {
	res.json({
		status:'success',
		data:webpush.generateVAPIDKeys()
	});
}).post('/subscribe', (req, res, next) => {
	console.log(req.body);
	res.json({status:'success'});
}).post('/push_notification', (req, res, next) => {

	var FCM = new fcm('./angela-server-testing-firebase-adminsdk-urncc-cb786dca05.json');
	var message = {
		data: {
			score: '850',
			time: '2:45'
		},
		notification:{
			title : 'Title of notification',
			body : 'Body of notification'
		},
		token : req.body.android.token
	};

	console.log(message)

	FCM.send(message, function(err, response) {
		if (err) {
			console.log('error found', err);
		} else {
			console.log('response here', response);
		}
	});

	webpush.setVapidDetails('mailto:'+mailTO, publicKey, privateKey);
	var notification_data = {
		notification: {
			lang: req.body.notification.lang,
			title: req.body.notification.title,
			body: req.body.notification.body,
			data: req.body.notification.data,
			icon: req.body.notification.icon,
			badge: req.body.notification.badge,
			dir: req.body.notification.dir,
			tag: req.body.notification.tag
		},
		android: {
			ttl: 3600 * 1000,
			notification: {
				icon: 'stock_ticker_update',
				color: '#f45342',
			}
		},
		ios: {
			payload: {
				aps: {
					badge: 42
				}
			}
		},
		topic: 'TopicName'
	};
	webpush.sendNotification(req.body.push_id, JSON.stringify(notification_data)).then(data => {
		res.json({status:'success'});
	}, error => {
		console.log(error)
		res.json({status:'error'});
	});
});


module.exports = { router, router_path }