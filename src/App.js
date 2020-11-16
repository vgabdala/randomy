import React, { Component } from "react";
import "./App.css";
import Lottery from "./components/Lottery.js";
import { Container, Row, Col } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col />
            <Col>
              <h1>Who's next?</h1>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col className="justify-content-md-center">
              <Lottery participantsName="Participants" />
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
