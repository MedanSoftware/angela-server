var Joi = require('@hapi/joi');
var webpush = require('web-push');
var node_schedule = require('node-schedule');
var router = require('express').Router();
var router_path = '/webpush';

webpush.setVapidDetails('mailto:'+Config.webpush.mail_to, Config.webpush.vapid.public_key, Config.webpush.vapid.private_key);

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
}).post('/send_notification', (req, res, next) => {
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


module.exports = { router, router_path, webpush }