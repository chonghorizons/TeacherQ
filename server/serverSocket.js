import {Student, Teacher} from '../common/teacherQUsers'

const serverSocket = (io) => {
  io.storage={};
  io.storage.teachers=[];
  io.storage.students=[];

  io.on('connection', (socket) => {
    console.log('a user connected');
    let currentQueue = '';

    socket.emit('stc_message', 'hello world!');
    socket.on('cts_message', (data) => { console.log(data); });

    socket.on('teacherLogin', (teacherInputs) => {
      function checkTeacherInputs();

      if (checkTeacherInputs()) {
        socket.teacher=new Teacher(teacherInputs)
        io.teachers.
      }


    })


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
