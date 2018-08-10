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
    this.state = {
      position: 0,
      queueSize: 0,
      yourName: yourName,
      isTeacher: (yourName==="SECRETTEACHER"),
      queue: ["Jane", "John"],
    };
    this.handleJoinQueueClick = (e) => {
      e.preventDefault();
      this.setState({
        position: 1,
        queueSize: 1,
      })
      // this.socket.emit('addQueue', yourName,
      //   x => console.log('CLIENT GOT FROM addQueue', x)
      // );
    };
  }

  componentDidMount = () => {
    if (this.state.isTeacher) {
      console.log("TEACHER!");
      // socket.emit('teacherGetQueue', null, (queue)=>this.setState( { queue }));
    }
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 30 }}>
          <Grid container justify="center" spacing={8}>
            { this.state.position===0 ?
              <div>You are not in the queue currently. <button onClick={this.handleJoinQueueClick}>Join Q!</button></div> :
              <div>
                Your position is {this.state.position} out of {this.state.queueSize}.
                <button onClick={this.handleJoinQueueClick}>I figured it out! Leave Q</button>
              </div>
            }
            <hr />
            <hr />
            { this.state.isTeacher ?
              <div>
                <div>You are the teacher. Here is the queue:</div>
                <ul>
                  {this.state.queue.map((x)=>(<li>x</li>))}
                </ul>
              </div> :
              null
            }
          </Grid>
        </div>
    </div>);
  }
}
