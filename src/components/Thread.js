import React, { Component } from 'react';
import '../assets/css/thread.css';

class Thread extends Component {
  render() {
    return (
      <div className="thread">
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Thread;
