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

const columnTarget = {
  drop(props, monitor, component) {
    var thread = monitor.getItem();
    if (monitor.didDrop() === false) {
      thread.removeThread(thread.id);
      var threads = component.state.threads;
      threads.push(thread);
      threads = organizeThreads(threads);
      component.setState({
        threads: threads
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
    this.placeAThreadOnTopOfB = this.placeAThreadOnTopOfB.bind(this);
    // this.addThread = this.addThread.bind(this);
  }

  shouldComponentUpdate(prevProps, prevState) {
    return (prevState !== this.state);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('MAKE MY AJAX REQUEST');
    console.log(this.state);
    console.log(this.props.colName);
  }

  removeThread(id) {
    var threads = this.state.threads.filter(function(thread) {
      return thread.id !== id;
    });
    this.setState({threads: threads});
  }

  placeAThreadOnTopOfB(threadB, posThreadA) {
    threadB.removeThread(threadB.id);
    var threads = this.state.threads;
    threads.splice(posThreadA - 1, 0, threadB);
    threads = organizeThreads(threads);
    this.setState({
      threads: threads
    });
  }

  render() {
    const { connectDropTarget, colName } = this.props;
    const removeThread = this.removeThread;
    const placeAThreadOnTopOfB = this.placeAThreadOnTopOfB;
    // const addThread = this.addThread;
    // <AddThread onClick={addThread} />
    return connectDropTarget(
      <div className={ 'productboard-column' }>
        <div className='productboad-column-title'>
          <h3>  
          {colName}
          </h3>
        </div>
        
        {
          this.state.threads.map(function(data, i) {
            return (<Thread
                    key={i}
                    id={data.id}
                    position={data.position}
                    content={data.content} 
                    removeThread={removeThread}
                    placeAThreadOnTopOfB={placeAThreadOnTopOfB}
                    // addThread={addThread}
                    />);
          })
        }
      </div>
    );
  }
}

Column.propTypes = {
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.THREAD, columnTarget, collect)(Column);