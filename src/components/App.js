import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
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
           <Column colName="backlog" threads={data.backlog} />
           <Column colName="feature" threads={data.features} />
           <Column colName="Done" threads={data.done} />
          </div> 
        </div>
      </div>
    );
  }
}

App.propType = {
  data: PropTypes.object.isRequired
};

export default DragDropContext(HTML5Backend)(App);
