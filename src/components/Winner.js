import React, { Component } from "react";
import Col from "react-bootstrap/Col";

class Winner extends Component {
  render() {
    return (
      <div>
        <Col>
          <h3 className="Section-Winner">{this.props.name}</h3>
        </Col>
      </div>
    );
  }
}

export default Winner;
