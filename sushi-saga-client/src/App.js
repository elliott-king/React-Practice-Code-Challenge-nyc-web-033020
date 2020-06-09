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
    eaten: [],
    budget: 100,
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
    this.setState(prevState => {
      let hasBeenEaten = prevState.eaten.includes(sushi)
      let haveEnoughMoney = prevState.budget >= sushi.price
      if (!hasBeenEaten && haveEnoughMoney) {
        let i = prevState.sushis.indexOf(sushi)
        sushi.eaten = true
        return {
          sushis: [...prevState.sushis.slice(0, i), sushi, ...prevState.sushis.slice(i + 1)],
          eaten: [...prevState.eaten, sushi],
          budget: prevState.budget - sushi.price
        }
      }
    })
  }

  handleMoreClick = (event) => {
    this.setState(prevState => {
      return {
        start: prevState.start + 4,
        end: prevState.end + 4,
      }
    })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.state.sushis.slice(this.state.start, this.state.end)} 
          eatSushi={this.eatSushi}
          handleMoreClick={this.handleMoreClick}
        />
        <Table 
          money={this.state.budget}
          plates={this.state.eaten}
        />
      </div>
    );
  }
}

export default App;