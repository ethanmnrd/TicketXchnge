// @flow

import React, { Component } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { post } from 'axios';
import {
  addDays, addYears, isAfter, isBefore
} from 'date-fns';
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import LocationSearchInput from './LocationSearchInput';
import Map from './Map';
import { EVENTS_API_ROUTE } from '../../util/routes';

export default class CreateEvent extends Component<Props, State> {
  state = {
    lat: null,
    lng: null,
    city: null,
    eventName: '',
    eventDate: '',
    eventTime: '',
    submitted: false,
    venue: '',
    confirmationMessage: null,
    nameValid: true,
    addressValid: true,
    dateValid: true,
    timeValid: true
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleLocationChange = (address) => {
    this.setState({ lat: null, lng: null, venue: address });
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
        this.setState({ lat, lng });
      })
      .catch(error => console.error('Error', error));
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    if (!this.state.submitted && this.validateInput()) {
      this.setState({ submitted: true });
      const {
        eventName, venue, city, eventDate, eventTime
      } = this.state;
      post(EVENTS_API_ROUTE, {
        event_name: eventName,
        event_venue: venue,
        event_city: city,
        event_date: eventDate,
        start_time: eventTime
      })
        .then(res => this.setState({ confirmationMessage: 'SUCCESS' }))
        .catch((err) => {
          this.setState({
            submitted: false,
            confirmationMessage: `ERROR: ${err}`
          });
        });
    }
  };

  validateInput = () => {
    const {
      lat, lng, city, eventName, eventDate, eventTime
    } = this.state;
    const addressValid = lat !== null && lng !== null && city !== null;
    const nameValid = eventName.length > 0;
    const today = new Date(Date.now());
    const date = addDays(new Date(eventDate), 1);

    const dateValid = eventDate !== ''
      && isAfter(date, today)
      && isBefore(date, addYears(today, 1));
    const timeValid = eventTime !== '';
    this.setState({
      nameValid,
      addressValid,
      dateValid,
      timeValid
    });
    return addressValid && nameValid && dateValid && timeValid;
  };

  renderAlert = () => {
    if (this.state.confirmationMessage) {
      const { confirmationMessage } = this.state;
      if (confirmationMessage === 'SUCCESS') {
        return (
          <Alert color="success" style={{ marginTop: '20px' }}>
            Event creation successful!
          </Alert>
        );
      }
      if (confirmationMessage.includes('ERROR')) {
        return (
          <Alert color="danger" style={{ marginTop: '20px' }}>
            Something went wrong with event creation: {confirmationMessage}
          </Alert>
        );
      }
    }
    return null;
  };

  render() {
    const {
      lat,
      lng,
      eventName,
      eventDate,
      eventTime,
      submitted,
      venue,
      confirmationMessage
    } = this.state;
    console.dir(this.state);
    return (
      <Container>
        <h4 className="display-4 text-center">Fill us in on your details</h4>
        <Row style={{ marginTop: '25px' }}>
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
                    invalid={!this.state.nameValid}
                    disabled={submitted}
                  />
                  <FormFeedback>Name cannot be empty!</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="eventDate">
                    <b>Event Date</b>
                  </Label>
                  <Input
                    value={eventDate}
                    type="date"
                    name="eventDate"
                    onChange={this.handleUserInput}
                    invalid={!this.state.dateValid}
                    disabled={submitted}
                  />
                  <FormFeedback>
                    Date must be between within 1 year from tomorrow!{' '}
                  </FormFeedback>
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
                    invalid={!this.state.timeValid}
                    disabled={submitted}
                  />
                  <FormFeedback>Must use a valid start time!</FormFeedback>
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
                    disabled={submitted}
                  />
                  <div
                    className="invalid-feedback"
                    style={{
                      display: !this.state.addressValid ? 'block' : 'none'
                    }}
                  >
                    Please choose an address from the menu!
                  </div>
                </FormGroup>
                <Button
                  onClick={this.handleSubmitForm}
                  style={{ marginTop: '12px' }}
                  disabled={submitted}
                  color="primary"
                >
                  {submitted && !confirmationMessage ? 'Loading...' : 'Submit'}
                </Button>
                {this.renderAlert()}
              </Col>
            </Form>
          </Col>
          <Col md={6}>
            <Map lat={lat} lng={lng} venue={venue} />
          </Col>
        </Row>
      </Container>
    );
  }
}
