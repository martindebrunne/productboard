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
        {id: 1, position: 1, content: 'test'},
        {id: 2, position: 2, content: 'test2'},
        {id: 3, position: 3, content: 'test3'}
      ],
      features: [
        {id: 4, position: 1, content: 'f1'},
        {id: 5, position: 2, content: 'f2'},
        {id: 6, position: 3, content: 'f3'}
      ],
      done: [
        {id: 7, position: 1, content: 'd1'},
        {id: 8, position: 2, content: 'd2'},
        {id: 9, position: 3, content: 'd3'}
      ]};
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="flex-container">
           <Column colName="backlog" threads={data.backlog} />
           <Column colName="features" threads={data.features} />
           <Column colName="done" threads={data.done} />
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
