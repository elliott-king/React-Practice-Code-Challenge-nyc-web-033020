import React, { Component } from 'react';

class WalletForm extends Component {
  state ={
    amount: ""
  }

  handleChange = (event) => this.setState({amount: event.target.value})

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addMoney(this.state.amount)
    this.setState({amount: 0})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="number" value={this.state.amount} onChange={this.handleChange} name="amount" />
        <input type="submit" />
      </form>
    )
  }
}

export default WalletForm
