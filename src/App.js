import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';


//import clientSocket from './clientSocket';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('CONSTRUCTOR-THIS-keys', Object.keys(this));
    // clientSocket.bind(this)();
    const yourName=prompt('What is your name?')
    // SECRETTEACHER gives secretteacher rights
    let a=new Date();
    let b=new Date();
    let cOld=new Date();
    a.setTime(b.getTime()-1000*60*5.34)
    cOld.setTime(b.getTime()-1000*60*33.2)

    this.state = {
      position: 0,
      queueSize: 2,
      yourName: yourName,
      isTeacher: (yourName==="HAYLEYsecret"),
      teacherSocketOpen: true, // If there is no teacher socket open, tell the students to tell their teacher
      queue: [{name: "Zachary", timestamp: a}, {name: "Jane", timestamp: b}], ///zzzz make this only visible to teacher later, in dev, let all people see the same queue
      completedQueueWithWaitTimes: [{name: "Howard The Duck", timestamp: cOld, waitTime: "5.52"}]
    };
    this.handleJoinQueueClick = (e, overRideStudent) => {
      e.preventDefault();
      this.setState((prevState) => {
        const me={
          name: prevState.yourName,
          timestamp: new Date(),
        }
        const newLength= prevState.queue.push(overRideStudent || me);
        prevState.queueSize=newLength;
        prevState.position=newLength;
        return prevState;
      })
      // ZZZZZZ
      // this.socket.emit('addQueue', yourName,
      //   x => console.log('CLIENT GOT FROM addQueue', x)
      // );
    };
    this.handleLeaveQueueClick =(e) => {
      e.preventDefault();
      this.setState((prevState) => {
        prevState.queue.splice(prevState.position-1, 1);
        prevState.queueSize=prevState.queue.length;
        prevState.position=0;
        return prevState;
      })
      // socket version ZZZZZZ
    }
    this.rebroadcast=(e) => {
      alert("STUB: implement broadcast new queue from teacher to students")
      // need to do sockets.
      this.handleRebroadcast("pass-a-stateZZZZZ");
    }
    this.handleRebroadcast=(socketState) => {
      // do something with the incoming socketState
      this.setState((prevState) => {
        const indexOf= prevState.queue.map((x)=>x.name).indexOf(true)
        return ({
          position:  indexOf+1 ,
          queueSize: prevState.queue.length,
        })
      })
      // need to do sockets.
    }
    this.handleTeacherRemovesStudentClick =(e, studentName) => {
      e.preventDefault();
      console.log("line58", studentName)
      this.setState((prevState) => {
        const studentsToRemove=prevState.queue.filter(x=>x.name===studentName)
        const studentsToRemoveWithWaitTimes=studentsToRemove.map((x)=>{
          x.waitTime=((new Date()-x.timestamp)/(1000*60)).toFixed(2);
          return x
        })
        prevState.queue=prevState.queue.filter(x=>x.name!==studentName);
        prevState.queueSize=prevState.queue.length;
        prevState.completedQueueWithWaitTimes=prevState.completedQueueWithWaitTimes.concat(studentsToRemoveWithWaitTimes)
        this.rebroadcast();
        console.log(prevState)
        return prevState;
      })
      // socket version ZZZZZZ
    }
  }

  componentDidMount = () => {
    if (this.state.isTeacher) {
      console.log("TEACHER!");
      // socket.emit('teacherGetQueue', null, (queue)=>this.setState( { queue }));
    }
  }

  render() {
    console.count('RENDER');
    console.log(this.state)
    return (
      <div>
        <div style={{ marginTop: 30 }}>
            <div>
              { this.state.position===0 ?
                <div>You are not in the queue currently. <button onClick={this.handleJoinQueueClick}>Join Q!</button></div> :
                <div>
                  Your position is {this.state.position} out of {this.state.queueSize}.
                  <button onClick={this.handleLeaveQueueClick}>I figured it out! Leave Q</button>
                </div>
              }
            </div>
            <hr />
            <hr />
            { this.state.isTeacher ?
              <div>
                <div>You are the teacher.
                  <button onClick={(e)=> {
                    let myStudent={
                      name: "RAND"+String(Math.floor(Math.random()*1000)),
                      timestamp: new Date(),
                     }
                    this.handleJoinQueueClick(e, myStudent)
                  }}>
                    AddRandomStudentNameToQueue
                  </button>
                  <p>Here is the queue:</p>
                  <ul>
                    {this.state.queue.map((x)=>{
                      return (<li>
                        {x.name} -- {x.timestamp.toString()}
                        <button onClick={(e)=>this.handleTeacherRemovesStudentClick(e, x.name)}>DEL</button>
                      </li>)
                    })}
                  </ul>
                </div>
                <hr />
                <div>Here is the completed queue:
                  <ul>
                    {this.state.completedQueueWithWaitTimes.map((x)=>(<li>{x.name} -- waited {x.waitTime} minutes {x.timestamp.toString()}</li>))}
                  </ul>
                </div>
              </div> :
              null
            }
        </div>
    </div>);
  }
}
