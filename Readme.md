# Angela Server

Ulangi angela server, jadikan namanya angela saja 
meniru system codeigniter menggunakan view engine handlebars

## Configuration

### Application Config

setup file : `application/config/config.js`

### Database Config

setup file : `application/config/database.js`

---

## WebSocket - Socket.io

Read more about [Socket.io](https://socket.io/docs/)

> connecting to websocket server

### Connect By HTML

```html
<script src="http://{{ angela_host }}:{{ angela_port }}/AngelaSocketio/socket.io.js"></script>
<script>
var socket = io('http://{{ angela_host }}:{{ angela_port }}', {
	path : 'AngelaSocketio',
	transports : ['websocket', 'polling']
});

socket.on('connection', (socket) => {
	console.log('connected');
});
</script>
```

### Connect By Webpack

```javascript
import io from 'socket.io-client';

var socket = io('http://{{ angela_host }}:{{ angela_port }}', {
	path : 'AngelaSocketio',
	transports : ['websocket', 'polling']
});

socket.on('connection', (socket) => {
	console.log('connected');
});
```

---

## PeerJs

Read more about [PeerJs](https://peerjs.com/docs.html)

> connecting to peerjs server

### Connect By HTML

```html
<script src="https://unpkg.com/peerjs@1.2.0/dist/peerjs.min.js"></script>
var peer = new Peer('GenerateYourRandomID', {
	host : '{{ angela_host }}',
	port : '{{ angela_port }}',
	path : '/AngelaPeerJs'
});
peer.on('open', function(id){
	console.log('My peer ID is: ' + id);
});
```

### Connect By Webpack

```javascript
import PeerJsClient from 'peerjs-client';

var peer = new PeerJsClient('GenerateYourRandomID', {
	host : '{{ angela_host }}',
	port : '{{ angela_port }}',
	path : '/AngelaPeerJs'
});

peer.on('open', function(id){
	console.log('My peer ID is: ' + id);
});
```

## Web Push Notification

### Mozilla Firefox

```json
{
	"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABezLbQIcRt3SlmmlHlB-rtt7MgHWImEb7Avp__Yz1-zfx10eTnGZE8uf1Mr4gZS7qn_a0vbe_pXHaX_icc-0ujEdG6dYVO5Djc246Ps8gJ9PAjup1xvkFtBlBOHyuPBRzB9XCa5fGkN7XzTrB-xZKd0nOo6z7RfGdS7AoyAVoSowSHoSg",
	"keys": {
		"auth":"EpkSK2ezBp_nb2-OupfiHg",
		"p256dh":"BBBDHYf-_-Qn3oNe06_V8GVy7tU-AlrPIbzBjrcH4vAiAL9Kgwy4M_aslubxt6aHW7oAF0mi35lMXzz6POxNrJI"
	}
}
```

### Google Chrome

```json
{
	"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABezLbQIcRt3SlmmlHlB-rtt7MgHWImEb7Avp__Yz1-zfx10eTnGZE8uf1Mr4gZS7qn_a0vbe_pXHaX_icc-0ujEdG6dYVO5Djc246Ps8gJ9PAjup1xvkFtBlBOHyuPBRzB9XCa5fGkN7XzTrB-xZKd0nOo6z7RfGdS7AoyAVoSowSHoSg",
	"keys": {
		"auth":"EpkSK2ezBp_nb2-OupfiHg",
		"p256dh":"BBBDHYf-_-Qn3oNe06_V8GVy7tU-AlrPIbzBjrcH4vAiAL9Kgwy4M_aslubxt6aHW7oAF0mi35lMXzz6POxNrJI"
	}
}
```