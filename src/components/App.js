import React, { Component } from 'react';
import Navbar from './Navbar'
import Column from './Column'
import '../assets/css/container.css'

class App extends Component {
  render() {
    const data = {
      backlog: [
        {position: 1, content: 'test'},
        {position: 2, content: 'test2'},
        {position: 3, content: 'test3'}
      ],
      features: [
        {position: 1, content: 'f1'},
        {position: 2, content: 'f2'},
        {position: 3, content: 'f3'}
      ],
      done: [
        {position: 1, content: 'd1'},
        {position: 2, content: 'd2'},
        {position: 3, content: 'd3'}
      ]};
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="flex-container">
           <Column name="backlog" threads={data.backlog} />
           <Column name="feature" threads={data.features} />
           <Column name="Done" threads={data.done} />
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
