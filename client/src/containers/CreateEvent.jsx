// @flow

import React, { Component } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { post } from 'axios';
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
import { EVENTS_API_ROUTE } from '../../util/routes';

export default class CreateEvent extends Component<Props, State> {
  state = {
    formValid: 'false',
    lat: null,
    lng: null,
    city: null,
    eventName: '',
    eventDate: '',
    eventTime: '',
    venue: ''
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, this.validateInput);
  };

  handleLocationChange = (address) => {
    this.setState({ lat: null, lng: null, venue: address }, this.validateInput);
  };

  handleLocationSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        this.setState({ venue: address });
        const city = results[0].address_components.find(
          e => e.types[0] === 'locality'
        ).long_name;
        this.setState({ city });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        this.setState(
          {
            lat,
            lng
          },
          this.validateInput
        );
      })
      .catch(error => console.error('Error', error));
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const {
      eventName, venue, city, eventDate, eventTime
    } = this.state;
    console.dir(this.state);
    post(EVENTS_API_ROUTE, {
      event_name: eventName,
      event_venue: venue,
      event_city: city,
      event_date: eventDate,
      start_time: eventTime
    })
      .then((res) => {})
      .catch((err) => {
        console.dir(err);
      });
  };

  validateInput = () => {
    const {
      lat, lng, city, eventName, eventDate, eventTime
    } = this.state;
    this.setState({
      formValid:
        lat !== null
        && lng !== null
        && city !== null
        && eventName.length !== 0
        && eventDate !== null
        && eventTime !== null
    });
  };

  render() {
    const {
      formValid,
      lat,
      lng,
      eventName,
      eventDate,
      eventTime,
      venue
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
                    <Label for="eventDate">
                      <b>Start Date</b>
                    </Label>
                    <Input
                      value={eventDate}
                      type="date"
                      name="eventDate"
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
                      value={eventTime}
                      type="time"
                      name="eventTime"
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
                      address={venue}
                      handleLocationChange={this.handleLocationChange}
                      handleLocationSelect={this.handleLocationSelect}
                    />
                  </FormGroup>
                </Col>
              </Form>
            </Col>
            <Col md={6}>
              <Map lat={lat} lng={lng} venue={venue} />
            </Col>
          </Row>
          <Button
            onClick={this.handleSubmitForm}
            className="float-right"
            style={{ marginTop: '12px' }}
            disabled={!formValid}
            color="primary"
          >
            Continue
          </Button>
        </Jumbotron>
      </Container>
    );
  }
}
