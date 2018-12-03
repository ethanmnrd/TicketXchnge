// @flow

import React, { Component, Fragment } from 'react';
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
    address: '',
    googleAddress: null,
    addressValid: true,
    price: '',
    priceValid: true,
    quantity: '',
    quantityValid: true,
    confirmationMessage: null,
    lat: null,
    lng: null
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleLocationChange = (address) => {
    this.setState({ address });
  };

  handleLocationSelect = (address) => {
    this.setState({ address, googleAddress: address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          lat,
          lng
        });
      })
      .catch(error => console.error('Error', error));
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    if (this.validateInput()) {
      const { price, quantity, address } = this.state;
      const fee = (price - (parseFloat(price) * 0.95).toFixed(2)).toFixed(2);
      post(
        TICKETS_API_ROUTE,
        {
          ticket_event: this.props.eventDetails.event_name,
          ticket_price: price,
          ticket_quantity: quantity,
          ticket_address: address,
          ticket_fee: fee,
          ticket_subtotal: (parseFloat(price) * 0.95).toFixed(2),
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
    }
  };

  validateInput = () => {
    const {
      address, googleAddress, quantity, price
    } = this.state;
    const quantityValid = new RegExp('^\\d+$').test(quantity);
    const priceValid = new RegExp('^(?:\\d+)($|(?:\\.\\d{2})$)').test(price);
    const addressValid = address === googleAddress;
    this.setState({ addressValid, quantityValid, priceValid });
    return quantityValid && priceValid && addressValid;
  };

  validPrice = () => {
    const { price } = this.state;
    return new RegExp('^(?:\\d+)($|(?:\\.\\d{2})$)').test(price);
  };

  renderAlert = () => (this.state.confirmationMessage ? (
    <Alert style={{ marginLeft: '15px', padding: '10px' }} color="primary">
      {this.state.confirmationMessage}
    </Alert>
  ) : null);

  render = () => {
    const {
      address,
      addressValid,
      googleAddress,
      quantity,
      quantityValid,
      price,
      priceValid,
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
                <div
                  className="invalid-feedback"
                  style={{ display: !addressValid ? 'block' : 'none' }}
                >
                  Please choose an address from the menu!
                </div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="quantity">Ticket Quantity</Label>
                <Input
                  value={quantity}
                  onChange={this.handleUserInput}
                  placeholder="Enter Quantity"
                  type="text"
                  name="quantity"
                  invalid={!quantityValid}
                />
                <FormFeedback>Please use a valid quantity!</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="price">
                  Ticket Price
                  <small className="text-muted"> (5% fee)</small>
                </Label>
                <Input
                  value={price}
                  onChange={this.handleUserInput}
                  placeholder="Enter Price"
                  type="text"
                  name="price"
                  invalid={!priceValid}
                  valid={this.validPrice()}
                />
                <FormFeedback>Please enter a valid price!</FormFeedback>
                {this.validPrice() ? (
                  <Fragment>
                    <FormFeedback valid>
                      Fee - $
                      {(price - (parseFloat(price) * 0.95).toFixed(2)).toFixed(
                        2
                      )}
                    </FormFeedback>
                    <FormFeedback valid>
                      Subtotal - ${(parseFloat(price) * 0.95).toFixed(2)}
                    </FormFeedback>
                  </Fragment>
                ) : null}
              </FormGroup>
            </Col>
            <Button
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
          <Map lat={lat} lng={lng} venue={googleAddress} />
        </Row>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  jwt: state.jwt
});

export default connect(mapStateToProps)(SellTicket);
