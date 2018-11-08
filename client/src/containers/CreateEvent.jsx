// @flow

import React, { Component } from 'react';
import {
  Button,
  Container,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Label,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { CREATE_EVENT_PAGE } from '../../util/routes';

export default class CreateEvent extends Component<Props, State> {
  state = {
    formValid: 'false',
    eventName: '',
    eventStartDate: '',
    eventStartTime: '',
    eventEndDate: '',
    eventEndTime: '',
    venueName: '',
    venueAddress: '',
    venueCity: '',
    venueZip: ''
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const {
      eventName,
      eventStartDate,
      eventStartTime,
      eventEndDate,
      eventEndTime,
      venueName,
      venueAddress,
      venueCity,
      formValid,
      venueZip
    } = this.state;
    return (
      <Container>
        <h4 className="display-4 text-center">Fill us in on your details</h4>
        <Jumbotron style={{ paddingTop: '25px', marginTop: '25px' }}>
          <Form>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="eventName">
                    <b>Event Name</b>
                  </Label>
                  <Input
                    value={eventName}
                    type="text"
                    name="eventName"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="eventStartDate">
                    <b>Start Date</b>
                  </Label>
                  <Input
                    value={eventStartDate}
                    type="date"
                    name="eventStartDate"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label>
                    <b>Start Time</b>
                  </Label>
                  <Input
                    value={eventStartTime}
                    type="time"
                    name="eventStartTime"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="eventEndDate">
                    <b>End Date</b>
                  </Label>
                  <Input
                    value={eventEndDate}
                    type="date"
                    name="eventEndDate"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="eventEndTime">
                    <b>End Time</b>
                  </Label>
                  <Input
                    value={eventEndTime}
                    type="time"
                    name="eventEndTime"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Label for="venueName">
                    <b>Venue Details</b>
                  </Label>
                  <Input
                    value={venueName}
                    type="text"
                    name="venueName"
                    placeholder="Venue Name"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    value={venueAddress}
                    type="text"
                    name="venueAddress"
                    placeholder="Venue Address"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    value={venueCity}
                    type="text"
                    name="venueCity"
                    placeholder="Venue City"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    value={venueZip}
                    type="number"
                    name="venueZip"
                    placeholder="Venue ZIP Code"
                    onChange={this.handleUserInput}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Button className="float-right" disabled={formValid} color="primary">
            Continue
          </Button>
        </Jumbotron>
      </Container>
    );
  }
}
