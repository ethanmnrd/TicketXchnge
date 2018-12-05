import React from 'react';
import { connect } from 'react-redux';
import CreditCardInput from 'react-credit-card-input';
import { push } from 'connected-react-router';
import { get, delete as delet } from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import valid from 'card-validator';
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
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import LocationSearchInput from '../containers/LocationSearchInput';
import { DELETE_TICKET_API_ROUTE } from '../../util/routes';
import { US_STATES } from '../../util/config';

class CheckoutPage extends React.Component {
  state = {
    submitted: false,
    confirmationMessage: null,
    upsCost: 5,
    uberCost: null,
    method: 'ups',
    address: '',
    googleAddress: null,
    startLocation: { lat: null, lng: null },
    endLocation: { lat: null, lng: null },
    locationValid: true,
    creditCard: {
      cvc: '',
      expiry: '',
      number: ''
    },
    creditCardValid: true,
    billingAddress: '',
    billingAddressValid: true,
    city: '',
    cityValid: true,
    state: '',
    stateValid: true,
    zipcode: '',
    zipcodeValid: true
  };

  setUberEstimate = () => {
    const { startLocation, endLocation } = this.state;
    get('https://api.uber.com/v1.2/estimates/price', {
      params: {
        start_latitude: startLocation.lat,
        start_longitude: startLocation.lng,
        end_latitude: endLocation.lat,
        end_longitude: endLocation.lng
      },
      headers: { authorization: `Token ${process.env.UBER_API_KEY}` }
    })
      .then((res) => {
        const uberCost = res.data.prices.find(e => e.display_name === 'UberX')
          .high_estimate;
        this.setState({ uberCost });
      })
      .catch(err => console.dir(err));
  };

  validateInput = () => {
    const {
      address,
      googleAddress,
      billingAddress,
      creditCard,
      city,
      state,
      zipcode
    } = this.state;
    const locationValid = address === googleAddress;
    const billingAddressValid = billingAddress.length > 0;
    const creditCardValid = valid.number(creditCard.number) && creditCard.cvc.length === 3;
    const cityValid = city.length > 0;
    const stateValid = state.length === 2;
    const zipcodeValid = zipcode.length === 5;
    this.setState({
      locationValid,
      billingAddressValid,
      creditCardValid,
      cityValid,
      stateValid,
      zipcodeValid
    });
    return (
      locationValid
      && billingAddressValid
      && creditCardValid
      && cityValid
      && stateValid
      && zipcodeValid
    );
  };

  handleLocationChange = (address) => {
    this.setState({ endLocation: { lat: null, lng: null }, address });
  };

  handleLocationSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        this.setState({ address, googleAddress: address });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        this.setState(
          {
            endLocation: { lat, lng }
          },
          this.setUberEstimate
        );
      })
      .catch(error => console.error('Error', error));

    geocodeByAddress(this.state.startLocation)
      .then((results) => {
        this.setState({ address, googleAddress: address });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        this.setState({
          startLocation: { lat, lng }
        });
      })
      .catch(error => console.error('Error', error));
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, this.validateInput);
  };

  handleCardInput = (name, value) => {
    this.setState(prevState => ({
      creditCardValid: true,
      creditCard: {
        ...prevState.creditCard,
        [name]: value
      }
    }));
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    if (!this.state.submitted && this.validateInput()) {
      this.setState({ submitted: true });
      delet(DELETE_TICKET_API_ROUTE + this.props.ticketDetails.tid)
        .then(() => {
          this.setState({ confirmationMessage: 'SUCCESS' });
        })
        .catch((err) => {
          console.err(err);
          this.setState({
            submitted: false,
            confirmationMessage: `ERROR: ${err}`
          });
        });
    }
  };

  renderAlert = () => {
    if (this.state.confirmationMessage) {
      const { confirmationMessage } = this.state;
      if (confirmationMessage === 'SUCCESS') {
        return (
          <Alert color="success" disabled style={{ display: 'inline-block' }}>
            Ticket purchase successfull!
          </Alert>
        );
      }
      if (confirmationMessage.includes('ERROR')) {
        return (
          <Alert color="danger" disabled style={{ display: 'inline-block' }}>
            Something went wrong with event creation: {confirmationMessage}
          </Alert>
        );
      }
    }
    return null;
  };

  componentDidMount = () => {
    geocodeByAddress(this.props.ticketDetails.venue)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          startLocation: {
            lat,
            lng
          }
        });
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    const {
      submitted,
      confirmationMessage,
      address,
      creditCard,
      method,
      upsCost,
      uberCost,
      creditCardValid,
      locationValid,
      billingAddress,
      billingAddressValid,
      city,
      cityValid,
      state,
      stateValid,
      zipcode,
      zipcodeValid
    } = this.state;
    const ticketPrice = parseFloat(this.props.ticketDetails.ticket_price);
    const fee = (Math.round(ticketPrice * 0.05 * 100) / 100).toFixed(2);
    const shippingCost = method === 'ups' ? upsCost : uberCost;
    const totalCost = ticketPrice + parseFloat(fee) + shippingCost;
    return (
      <Container>
        <Row>
          <Col md={9}>
            <Form>
              <h4 className="mb-4">Billing</h4>
              <Row form>
                <Col md={5}>
                  <FormGroup>
                    <Label for="billingAddress">Billing Address</Label>
                    <Input
                      type="text"
                      name="billingAddress"
                      value={billingAddress}
                      invalid={!billingAddressValid}
                      onChange={this.handleUserInput}
                    />
                    <FormFeedback>Billing Address can't be empty!</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      type="text"
                      name="city"
                      value={city}
                      invalid={!cityValid}
                      onChange={this.handleUserInput}
                    />
                    <FormFeedback>City</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      type="select"
                      name="state"
                      value={state}
                      invalid={!stateValid}
                      onChange={this.handleUserInput}
                    >
                      {US_STATES.map(e => (
                        <option key={e}>{e}</option>
                      ))}
                    </Input>
                    <FormFeedback>State can't be empty!</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="zipcode">Zip</Label>
                    <Input
                      type="number"
                      name="zipcode"
                      value={zipcode}
                      invalid={!zipcodeValid}
                      onChange={this.handleUserInput}
                    />
                    <FormFeedback>Please used valid zip!</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <hr className="mb-4" />
              <h4 className="mb-4">Payment Method</h4>
              <CreditCardInput
                dangerTextClassName="text-danger"
                cardNumberInputProps={{
                  value: creditCard.number,
                  onChange: e => this.handleCardInput('number', e.target.value)
                }}
                cardExpiryInputProps={{
                  value: creditCard.expiry,
                  onChange: e => this.handleCardInput('expiry', e.target.value)
                }}
                cardCVCInputProps={{
                  value: creditCard.cvc,
                  onChange: e => this.handleCardInput('cvc', e.target.value)
                }}
                fieldClassName="credit-card-input__field "
                inputClassName="credit-card-input__input"
              />
              <div
                className="invalid-feedback"
                style={{
                  display: !creditCardValid ? 'block' : 'none'
                }}
              >
                Please check your credit card input!
              </div>
              <hr className="mb-4" />
              <h4 className="mb-4">Shipping Method</h4>
              <Row form>
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        checked={method === 'ups'}
                        onChange={() => this.setState({ method: 'ups' })}
                        name="ups"
                      />
                      UPS
                      <span className="text-muted">
                        {' '}
                        (3-5 business days) - ${upsCost}
                      </span>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        checked={method === 'uber'}
                        disabled={uberCost === null}
                        onChange={() => this.setState({ method: 'uber' })}
                        name="uber"
                      />
                      <span className={uberCost === null ? 'text-muted' : ''}>
                        Expeditated Uber Shipping
                      </span>
                      {uberCost === null ? (
                        <span
                          className={uberCost === null ? 'text-danger' : ''}
                        >
                          {' '}
                          (Input Address to see cost and time to arrival)
                        </span>
                      ) : (
                        <span className="text-muted">
                          (Same-day Uber) - ${uberCost}
                        </span>
                      )}
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Row>
              <Row>
                <Col md={6}>
                  <h4 className="mb-4">Shipping Address</h4>
                  <LocationSearchInput
                    address={address}
                    handleLocationChange={this.handleLocationChange}
                    handleLocationSelect={this.handleLocationSelect}
                  />
                  <div
                    className="invalid-feedback"
                    style={{
                      display: !locationValid ? 'block' : 'none'
                    }}
                  >
                    Please choose an address from the menu!
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={3}>
            <h4 className="mb-3">Your Event</h4>
            <ListGroup>
              <ListGroupItem>
                <span>Event Subtotal</span>
                <span className="float-right">${ticketPrice}</span>
              </ListGroupItem>
              <ListGroupItem>
                <span>TicketX Fee (5%)</span>
                <span className="float-right">${fee}</span>
              </ListGroupItem>
              <ListGroupItem>
                <span>Shipping</span>
                <span className="float-right">
                  ${method === 'ups' ? upsCost : uberCost}
                </span>
              </ListGroupItem>
              <ListGroupItem color="success">
                <span>Total (USD)</span>
                <strong className="float-right">${totalCost.toFixed(2)}</strong>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Button
          onClick={this.handleSubmitForm}
          color="primary"
          style={{ margin: '20px 0px' }}
          disabled={submitted}
        >
          {submitted && !confirmationMessage ? 'Loading...' : 'Submit'}
        </Button>
        {this.renderAlert()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ticketDetails: state.router.location.state.ticketDetails
});

export default connect(
  mapStateToProps,
  { push }
)(CheckoutPage);
