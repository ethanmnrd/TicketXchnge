// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { post } from 'axios';
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row
} from 'reactstrap';
import LocationSearchInput from './LocationSearchInput';
import Map from './Map';
import { TICKETS_API_ROUTE } from '../../util/routes';

class SellTicket extends Component<Props, State> {
  state = {
    formValid: false,
    address: '',
    validAddress: null,
    price: 0,
    priceValid: true,
    quantity: 0,
    quantityValid: true,
    confirmationMessage: null,
    lat: null,
    lng: null
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, this.validateInput);
  };

  handleLocationChange = (address) => {
    this.setState({ address }, this.validateInput);
  };

  handleLocationSelect = (address) => {
    this.setState({ address, validAddress: address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
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
    const { price, quantity, address } = this.state;
    console.dir(this.props.jwt);
    post(
      TICKETS_API_ROUTE,
      {
        ticket_event: this.props.eventDetails.event_name,
        ticket_price: price,
        ticket_quantity: quantity,
        ticket_address: address,
        event: this.props.eventDetails.eid
      },
      { headers: { Authorization: this.props.jwt } }
    )
      .then((res) => {
        this.setState({ confirmationMessage: 'Success!' });
      })
      .catch((err) => {
        console.dir(err);
        this.setState({ confirmationMessage: 'Error' });
      });
  };

  validateInput = () => {
    const { validAddress, quantity, price } = this.state;
    const quantityValid = quantity > 0;
    const priceValid = price >= 0;
    this.setState({
      formValid: validAddress && quantityValid && priceValid
    });
  };

  renderAlert = () => (this.state.confirmationMessage ? (
    <Alert style={{ marginLeft: '15px', padding: '10px' }} color="primary">
      {this.state.confirmationMessage}
    </Alert>
  ) : null);

  render = () => {
    const {
      address,
      validAddress,
      quantity,
      quantityValid,
      price,
      priceValid,
      formValid,
      lat,
      lng
    } = this.state;
    return (
      <Container className="align-middle" style={this.props.style}>
        <Form style={{ marginTop: '20px' }}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="address">Shipping Address Source</Label>
                <LocationSearchInput
                  address={address}
                  handleLocationChange={this.handleLocationChange}
                  handleLocationSelect={this.handleLocationSelect}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="quantity">Ticket Quantity</Label>
                <Input
                  value={quantity}
                  onChange={this.handleUserInput}
                  placeholder="Enter Quantity"
                  type="number"
                  name="quantity"
                  invalid={!quantityValid}
                />
                <FormFeedback>Name cannot be empty!</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="price">Ticket Price</Label>
                <Input
                  value={price}
                  onChange={this.handleUserInput}
                  placeholder="Enter Price"
                  type="text"
                  name="price"
                  invalid={!priceValid}
                />
                <FormFeedback>Please enter a valid price!</FormFeedback>
              </FormGroup>
            </Col>
            <Button
              disabled={!formValid}
              onClick={this.handleSubmitForm}
              color="primary"
              style={{ marginBottom: '20px' }}
            >
              Submit
            </Button>
            {this.renderAlert()}
          </Row>
        </Form>
        <Row>
          <Map lat={lat} lng={lng} venue={validAddress} />
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  jwt: state.jwt
});

export default connect(mapStateToProps)(SellTicket);
