import io from 'socket.io-client';

function clientSocket() {
  console.log('clientSocket run');
  this.socket = io('http://localhost:8080');
  this.socket.emit('test', 'hi, from the client');
  this.socket.on('test', (data) => { console.log('socket.on(TEST)', data); });
  this.socket.on('errorMessage', (err) => { console.log('FAIL, PROBABLY IN JOIN', err); });

  // maybe need to fix curosr re-positioning. zzzzz
  this.socket.on('updatePosition', (position) => {
    console.count('RECEIVED updatePosition');
    console.log('new position', position);
    this.setState(
      { position }
    );
    const x = `SERVER Response updatePosition ${(new Date()).toISOString()}`;
    this.socket.emit('test', x);
  });

  this.socket.on('updateQueueSize', (queueSize) => {
    console.count('RECEIVED queueSize');
    console.log('new queueSize', queueSize);
    this.setState(
      { queueSize }
    );
    const x = `SERVER Response queueSize ${(new Date()).toISOString()}`;
    this.socket.emit('test', x);
  });

}

console.log('clientSocketImported');

export default clientSocket;
