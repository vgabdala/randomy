import React, { Component } from "react";
import LotteryResults from "./LotteryResults.js";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DynamicList from "./DynamicList.js";
import Cookies from "universal-cookie";

class Lottery extends Component {
  constructor(props) {
    super(props);

    let participantsFromCookie = new Cookies().get("participants");
    console.log();
    this.state = {
      winner: [],
      newParticipant: "",
      participantList: participantsFromCookie ? participantsFromCookie : []
    };

    //cookies.set("participants", "vinn, jon, sjda", { path: "/" });

    this.runLottery = this.runLottery.bind(this);
    this.getOrAddProperty = this.getOrAddProperty.bind(this);

    this.handleParticipantsChange = this.handleParticipantsChange.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.participants = [];
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <DynamicList
                value={this.state.newParticipant}
                name={this.props.participantsName}
                listItems={this.state.participantList}
                onSubmit={this.addParticipant}
                onChange={this.handleParticipantsChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <LotteryResults value={this.state.winner} />
            </Col>
          </Row>
          <Row>
            <Button onClick={this.runLottery} size="lg" variant="dark">
              Find out
            </Button>
          </Row>
        </Container>
      </div>
    );
  }

  runLottery(event) {
    let raffleResult = {};
    if (this.participants.length > 0) {
      let randomPickIndex = Math.floor(
        Math.random() * Math.floor(this.participants.length - 1)
      );
      let randomPick = this.participants[randomPickIndex];

      // Filters out randomly picked participant
      this.participants = this.participants.filter(value => {
        return value !== randomPick;
      });

      // Adds 'selected' class to randomPicks
      let participantList = this.state.participantList;
      participantList.forEach(listItem => {
        if (listItem.key === randomPick) {
          let clone = React.cloneElement(listItem, { className: "selected" });
          participantList = participantList.filter(listItem2 => {
            return listItem2.key !== randomPick;
          });
          participantList.push(clone);
        }
      });

      this.getOrAddProperty(raffleResult, randomPick, []);
      this.setState({ winner: raffleResult, participantList: participantList });
    }
  }

  getOrAddProperty(object, property, initializer) {
    if (!object[property]) {
      object[property] = initializer;
    }

    return object[property];
  }

  handleParticipantsChange(event) {
    //TO DO: autocomplete check
    this.setState({ newParticipant: event.target.value });
  }

  addParticipant(event) {
    let newEntry = this.state.newParticipant;
    let participantList = this.state.participantList;
    // Gets all existing participants
    let existingKeys = participantList.flatMap(participant => [
      participant.key
    ]);

    newEntry.split(";").forEach(entry => {
      // Avoids duplicates
      if (existingKeys.indexOf(newEntry) === -1) {
        participantList.push(
          <div id={entry.trim()} key={entry.trim()}>
            {entry.trim()}
          </div>
        );
        this.participants.push(entry.trim());
      }
      return;
    });

    this.setState({ newParticipant: "", participantList: participantList });
    event.preventDefault();
  }
}

export default Lottery;
