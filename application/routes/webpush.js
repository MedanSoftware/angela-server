var Joi = require('@hapi/joi');
var webpush = require('web-push');
var firebase_admin = require('firebase-admin');
var node_schedule = require('node-schedule');
var router = require('express').Router();
var router_path = '/webpush';

webpush.setVapidDetails('mailto:'+Config.webpush.mail_to, Config.webpush.vapid.public_key, Config.webpush.vapid.private_key);

var conf = firebase_admin.initializeApp({
	credential : firebase_admin.credential.applicationDefault()
});

// var fcm = require('fcm-notification');
// var FCM = new fcm('./angela-server-firebase-adminsdk-sm11w-254759e4fc.json');
// var token = 'fWZYhPgBTQSrKadexSY9uM:APA91bEAS1lim3GDqCyWpkGxwi34STMMOq4J4dM_Aq4z8rQ0cx1beCu_-W_s67Gdg18rgJ3_0uJ88IIzw0_y-hBwxTiP2--CpBJnrWhjw5Av98Ix3p_eldPPtn7P8KnFIQYbSCh9hkNB';

// 	var message = {
// 		data: {    //This is only optional, you can send any data
// 			score: '850',
// 			time: '2:45'
// 		},
// 		notification:{
// 			title : 'Title of notification',
// 			body : 'Body of notification'
// 		},
// 		token : token
// 		};

// FCM.send(message, function(err, response) {
//     if(err){
//         console.log('error found', err);
//     }else {
//         console.log('response here', response);
//     }
// })

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
		res.json({status:'error'});
	});
});


module.exports = { router, router_path, webpush }