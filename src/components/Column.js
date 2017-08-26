import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import Thread from './Thread';
import '../assets/css/column.css';

const columnTarget = {
  drop(props, targetMonitor) {
    console.log(props);
    console.log(targetMonitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}


class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { threads: this.props.threads };
  }
  

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className={ 'productboard-column ' + (isOver ? 'productboard-column-is-over' : '')}>
        {
          this.state.threads.map(function(data) {
            return (<Thread key={data.position} position={data.position} content={data.content} />);
          })
        }
      </div>
    );
  }
}

Column.propTypes = {
  colName: PropTypes.string.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.THREAD, columnTarget, collect)(Column);