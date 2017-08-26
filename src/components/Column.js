import React, { Component } from 'react';
import Thread from './Thread';
import '../assets/css/column.css';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = { threads: this.props.threads };
  }
  render() {
    return (
      <div className="productboard-column">
        {
          this.state.threads.map(function(data) {
            return (<Thread key={data.position} content={data.content} />);
          })
        }
      </div>
    );
  }
}

export default Column;
