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
import Map from './Map';

export default class CreateEvent extends Component<Props, State> {
  state = {
    formValid: 'false',
    lat: null,
    lng: null,
    city: null,
    eventName: '',
    eventStartDate: '',
    eventStartTime: '',
    venueAddress: ''
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleLocationChange = (address) => {
    this.setState({ lat: null, lng: null, venueAddress: address });
  };

  handleLocationSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        this.setState({ venueAddress: address });
        const city = results[0].address_components.find(
          e => e.types[0] === 'locality'
        ).long_name;
        this.setState({ city });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        this.setState({
          lat,
          lng
        });
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    const {
      formValid,
      lat,
      lng,
      eventName,
      eventStartDate,
      eventStartTime,
      venueAddress
    } = this.state;
    return (
      <Container>
        <h4 className="display-4 text-center">Fill us in on your details</h4>
        <Jumbotron style={{ paddingTop: '25px', marginTop: '25px' }}>
          <Row>
            <Col md={6}>
              <Form>
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
                <Col md={12}>
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
                <Col md={12}>
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
                <Col md={12}>
                  <FormGroup>
                    <Label>
                      <b>Venue Address</b>
                    </Label>
                    <LocationSearchInput
                      address={venueAddress}
                      handleLocationChange={this.handleLocationChange}
                      handleLocationSelect={this.handleLocationSelect}
                    />
                  </FormGroup>
                </Col>
              </Form>
            </Col>
            <Col md={6}>
              <Map lat={lat} lng={lng} venueAddress={venueAddress} />
            </Col>
          </Row>
          <Button className="float-right" disabled={!formValid} color="primary">
            Continue
          </Button>
        </Jumbotron>
      </Container>
    );
  }
}
