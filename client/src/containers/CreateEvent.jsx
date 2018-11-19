// @flow

import React, { Component } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  Row
} from 'reactstrap';
import LocationSearchInput from './LocationSearchInput';

export default class CreateEvent extends Component<Props, State> {
  state = {
    formValid: 'false',
    eventName: '',
    eventStartDate: '',
    eventStartTime: '',
    venueName: '',
    venueAddress: '',
    validAddress: ''
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleLocationChange = (address) => {
    this.setState({ venueAddress: address });
  };

  handleLocationSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ venueAddress: address, validAddress: address });
        console.log('Success', latLng);
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    const {
      formValid,
      eventName,
      eventStartDate,
      eventStartTime,
      venueName,
      venueAddress
    } = this.state;
    return (
      <Container>
        <h4 className="display-4 text-center">Fill us in on your details</h4>
        <Jumbotron style={{ paddingTop: '25px', marginTop: '25px' }}>
          <Form>
            <Row form>
              <Col md={6}>
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
              <Col md={6}>
                {/* <FormGroup>
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
                </FormGroup> */}
                <FormGroup>
                  <Label>
                    <b>Venue Details</b>
                  </Label>
                  <LocationSearchInput
                    address={venueAddress}
                    handleLocationChange={this.handleLocationChange}
                    handleLocationSelect={this.handleLocationSelect}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Input
                    value={venueAddress}
                    type="text"
                    name="venueAddress"
                    placeholder="Venue Address"
                    onChange={this.handleUserInput}
                  />
                </FormGroup> */
                /* <FormGroup>
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
                </FormGroup> */}
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
