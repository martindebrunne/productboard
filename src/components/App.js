import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Cable from 'actioncable';
import Navbar from './Navbar'
import Column from './Column'
import '../assets/css/container.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBoard: null,
      connected: false
    };
    this.userIsConnected = this.userIsConnected.bind(this);
    this.userReceivedData = this.userReceivedData.bind(this);
    this.updateColumn = this.updateColumn.bind(this);
  }

  componentWillMount() {
    this.createSocket();
  }

  createSocket() {
    var cable = Cable.createConsumer('ws://localhost:5000/cable?email=test@gmail.com&token=HUvAZfAbEyy_GUXVJH_A&product_name=test_1503891890');
    this.product = cable.subscriptions.create({
      channel: 'Products',
      product_name: 'test_1503891890'
    }, {
      connected: this.userIsConnected,
      received: this.userReceivedData,
      update: function(data) {
        this.perform('update', data);
      }
    });
  }

  userIsConnected() {
    this.setState({connected: true});
  }

  userReceivedData(data) {
    this.setState({currentBoard: data});
  }
  buildProductBoard() {

    if (this.state.connected && this.state.currentBoard) {
      return (
          <div className="container-fluid">
            <div className="flex-container">
             <Column colName="backlog" updateColumn={this.updateColumn} threads={this.state.currentBoard.backlog} />
             <Column colName="features" updateColumn={this.updateColumn} threads={this.state.currentBoard.features} />
             <Column colName="done" updateColumn={this.updateColumn} threads={this.state.currentBoard.done} />
            </div> 
          </div>
          );
    } else{
      return (<div> lol </div>);
    }
  }

  updateColumn(col_name, threads) {
    this.product.update({
      colName: col_name,
      threads: threads
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.buildProductBoard()}
      </div>
    );
  }
}

App.propType = {
  data: PropTypes.object.isRequired
};

export default DragDropContext(HTML5Backend)(App);
