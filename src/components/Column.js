import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import Thread from './Thread';
import '../assets/css/column.css';

function organizeThreads(threads) {
  threads.map(function(thread, i) {
    return thread.position = i + 1;
  });
  return (threads);
}

// function removeThread(threads, thread) {
//   console.log('remove le thread');
//   console.log(thread);
//   console.log(threads);
//   var index = threads.findIndex(function(item){
//     return thread.id === item.id;
//   });
//   if (index > -1) {
//     threads.splice(index, 1);
//     // this.setState({threads: this.state.threads});
//   }
//   // console.log(threads);
//   return threads;
// }

const columnTarget = {
  drop(props, monitor, component) {
    // console.log(monitor.getItem());
    var thread = monitor.getItem();
    if (props.colName !== thread.colName) {
      thread.removeThread(thread.id);
      component.state.threads.push(thread);
      component.state.threads = organizeThreads(component.state.threads);
    component.setState({
      threads: component.state.threads
    });
  }
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
    this.removeThread = this.removeThread.bind(this);
    // this.placeAThreadOnTopOfB = this.placeAThreadOnTopOfB.bind(this);
    // this.addThread = this.addThread.bind(this);
  }

  removeThread(id) {
    console.log(id);
    console.log(this.state.threads);
    var index = this.state.threads.findIndex(function(item){
      return id === item.id;
    });

    if (index > -1) {
      this.state.threads.splice(index, 1);
      this.setState({threads: this.state.threads});
    }

  }

  // placeAThreadOnTopOfB(threadB, posThreadA) {
    // console.log(threadB);
    // console.log(this.state.threads);
    // console.log('put on top');
    // console.log(threadB);
    // JE SUIS EN TRAIN DE POSITIONNER UN THREAD DEVANT UN AUTRE
    // console.log(this.state);
    // console.log(posThreadA);
    // console.log(threadB);
    // threadB.position = 999;
    // console.log(this.state.threads);
    // var threads = removeThread(this.state.threads, threadB);
    // console.log(threads);
    // this.state.threads.splice(posThreadA - 1, 0, threadB);
    // var threads = organizeThreads(this.state.threads);
    // console.log(threads);
    // this.setState({threads: threads});
    // this.state.map(function(thread, i) {
    //   if (i + 1 === posThreadA) {

    //   }
    //   return thread
    // });
    // var threads = organizeThreads(this.state.threads, threadB);

    // component.setState({
    //   threads: threads
    // });
  // }

  // addThread(thread) {
  //   console.log(this.state.threads)
  //   console.log(thread)
  // }

  render() {
    const { connectDropTarget, isOver, colName } = this.props;
    const removeThread = this.removeThread;
    // const placeAThreadOnTopOfB = this.placeAThreadOnTopOfB;
    // const addThread = this.addThread;
    return connectDropTarget(
      <div className={ 'productboard-column ' + (isOver ? 'productboard-column-is-over' : '')}>
        {
          this.state.threads.map(function(data) {
            // if (data.deleted != true) {
              return (<Thread
                      key={data.id}
                      id={data.id}
                      position={data.position}
                      content={data.content} 
                      removeThread={removeThread}
                      // placeAThreadOnTopOfB={placeAThreadOnTopOfB}
                      // addThread={addThread}
                      colName={colName}
                      />);
            // }
          })
        }
      </div>
    );
  }
}

Column.propTypes = {
  // colName: PropTypes.string.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.THREAD, columnTarget, collect)(Column);