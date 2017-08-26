import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import '../assets/css/thread.css';

const threadSource = {
  beginDrag(props) {
    return {
      content: props.content,
      position: props.position};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Thread extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className={ 'thread ' + (isDragging ? 'thread-is-dragging' : '') }>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

Thread.propType = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.THREAD, threadSource, collect)(Thread);
