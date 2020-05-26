var fs = require('fs');
var os = require('os');
var Joi = require('@hapi/joi');
var moment = require('moment');
let uuidv3 = require('uuid/v3');
var webpush = require('web-push');
var firebase_admin = require('firebase-admin');
var router = require('express').Router();
var router_path = '/webpush';
var node_schedule = require('node-schedule');


var conf = firebase_admin.initializeApp({
	credential : firebase_admin.credential.applicationDefault()
});

// console.log(conf)
// console.log(firebase_admin.messaging())

// var message = {
//   data: {
//     score: '850',
//     time: '2:45'
//   },
//   token: 'fWZYhPgBTQSrKadexSY9uM:APA91bEAS1lim3GDqCyWpkGxwi34STMMOq4J4dM_Aq4z8rQ0cx1beCu_-W_s67Gdg18rgJ3_0uJ88IIzw0_y-hBwxTiP2--CpBJnrWhjw5Av98Ix3p_eldPPtn7P8KnFIQYbSCh9hkNB'
// };

// // Send a message to the device corresponding to the provided
// // registration token.
// firebase_admin.messaging().send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });

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
	webpush.setVapidDetails('mailto:'+Config.webpush.mail_to, Config.webpush.vapid.public_key, Config.webpush.vapid.private_key);
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