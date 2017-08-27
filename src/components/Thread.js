import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource, DropTarget } from 'react-dnd';
import '../assets/css/thread.css';

const threadSource = {
  beginDrag(props) {
    return {
      id: props.id,
      colName: props.colName,
      content: props.content,
      position: props.position,
      removeThread: props.removeThread
    };
  }
  // ,
  // endDrag(props) {
  //   // props.removeThread({
  //   //   content: props.content,
  //   //   position: props.position
  //   // });
  //   return {
  //     id: props.id,
  //     colName: props.colName,
  //     content: props.content,
  //     position: props.position,
  //     removeThread: props.removeThread
  //   };
  // }
};


const threadTarget = {
  drop(props, monitor, component) {
    // props.placeAThreadOnTopOfB(monitor.getItem(), props.position);
    // props.addThread({
    //   content: props.content,
    //   position: props.position
    // });
  }
};

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Thread extends Component {
  render() {
    const { connectDragSource, connectDropTarget, isDragging, isOver } = this.props;
    return connectDragSource(connectDropTarget(
      <div className={ 'thread ' + (isDragging || isOver ? 'thread-is-grey' : '') }>
        <p>{this.props.content}</p>
        <p>{'position: ' + this.props.position}</p>
        <p>{'key: ' + this.props.id}</p>
      </div>
    ));
  }
}

Thread.propType = {
  // removeThread: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired
};


Thread = DragSource(ItemTypes.THREAD, threadSource, collectDrag)(Thread);
Thread = DropTarget(ItemTypes.THREAD, threadTarget, collectDrop)(Thread);

export default Thread;
