const serverSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');
    let currentQueue = '';

    socket.emit('test', 'hello world!');
    socket.on('test', (data) => { console.log(data); });

    socket.on('errorMessage', (err) => { console.log('FAIL', err); });

    socket.on('addQueue', (queueItem, fn) => {
      console.log("ADDQUEUE SOCKET", queueItem)
      
      fn(`${myDate}, ${currentQueue}`)
    });

    socket.on('removeQueue', (queueItem, fn) => {
      console.log("REMOVEQUEUE SOCKET", queueItem)

      fn(`${myDate}, ${currentQueue}`)
    });


    // PSEUDOCODE - rooms for each open Document
    //
  });
};

export default serverSocket;
