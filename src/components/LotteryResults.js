import React, { Component } from "react";
import Winner from "./Winner.js";
import Row from "react-bootstrap/Row";

class LotteryResults extends Component {
  constructor(props) {
    super(props);
    this.generateWinner = this.generateWinner.bind(this);
  }

  renderWinner() {
    const generatedWinner = Object.keys(this.props.value).map(
      this.generateWinner
    );
    return generatedWinner;
  }

  generateWinner(winner) {
    return (
      <Winner key={winner} name={winner} prizes={this.props.value[winner]} />
    );
  }

  render() {
    return (
      <div>
        <Row>{this.renderWinner()}</Row>
      </div>
    );
  }
}

export default LotteryResults;
