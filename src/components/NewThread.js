import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { ItemTypes } from './Constants';
// import { DropTarget } from 'react-dnd';
// import Thread from './Thread';
import '../assets/css/thread.css';

class NewThread extends Component {

  render() {
    return (<div onClick={this.props.handleClick} className="thread new-thread"></div>);
  }
}

export default NewThread;