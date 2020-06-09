import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    start: 0,
    end: 4,
  }

  getSushis = () => {
    fetch(API)
      .then(res => res.json())
      .then(json => this.setState({sushis: json}))
  }

  componentDidMount() {
    this.getSushis()
  }

  eatSushi = (sushi) => {
    console.log(sushi)
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.state.sushis.slice(this.state.start, this.state.end)} 
          eatSushi={this.eatSushi}
        />
        <Table />
      </div>
    );
  }
}

export default App;