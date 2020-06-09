import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import WalletForm from './components/WalletForm';

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
      let start = (prevState.start + 4) % prevState.sushis.length
      return {
        start: start,
        end: start + 4,
      }
    })
  }

  addMoney = (n) => {
    n = parseInt(n)
    this.setState(prevState => ({budget: prevState.budget + n}))
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
        <WalletForm addMoney={this.addMoney} />
      </div>
    );
  }
}

export default App;