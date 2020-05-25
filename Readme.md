# Angela

## Socket.io

### HTML

```html
<script src="http://{{ angela_host }}:{{ angela_port }}/AngelaSocketio/socket.io.js"></script>
<script>
const socket = io('http://{{ angela_host }}:{{ angela_port }}', {
	path : 'AngelaSocketio',
	transports : ['websocket', 'polling']
});
</script>
```

### Webpack Usage

```javascript
import io from 'socket.io-client';

const socket = io('http://{{ angela_host }}:{{ angela_port }}', {
	path : 'AngelaSocketio',
	transports : ['websocket', 'polling']
});

socket.on('connection', (socket) => {
	console.log('connected');
});
```

---

## PeerJs

### HTML

```html
<script src="http://{{ angela_host }}:{{ angela_port }}/AngelaSocketio/socket.io.js"></script>
<script>
const socket = io('http://{{ angela_host }}:{{ angela_port }}', {
	path : 'AngelaSocketio',
	transports : ['websocket', 'polling']
});
</script>
```

### Using Webpack

```javascript
import Peer from 'peerjs-client';

const peer = new Peer('{{ peer_unique_id }}', {host: '{{ angela_host }}', port: '{{ angela_port }}', path: '/AngelaPeerJs'});
peer.on('connection', data => {
	console.log('connected');
});
```