import React from 'react';
import { connect } from 'react-redux';
import CreditCardInput from 'react-credit-card-input';
import { push } from 'connected-react-router';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { get, delete as delet } from 'axios';
import {
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import LocationSearchInput from '../containers/LocationSearchInput';
import { DELETE_TICKET_API_ROUTE, HOME_PAGE_ROUTE } from '../../util/routes';

class CheckoutPage extends React.Component {
  state = {
    upsCost: 5,
    uberCost: null,
    method: 'ups',
    address: '',
    validAddress: null,
    startLocation: { lat: null, lng: null },
    endLocation: { lat: null, lng: null },
    creditCard: {
      cvc: '',
      expiry: '',
      name: '',
      number: ''
    }
  };

  getUberEstimate = () => {
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

  handleLocationChange = (address) => {
    this.setState(
      { endLocation: { lat: null, lng: null }, address },
      this.validateInput
    );
  };

  handleLocationSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        this.setState({ address, validAddress: address });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        this.setState(
          {
            endLocation: { lat, lng }
          },
          this.validateInput
        );
      })
      .catch(error => console.error('Error', error));

    geocodeByAddress(this.state.startLocation)
      .then((results) => {
        this.setState({ address, validAddress: address });
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        this.setState(
          {
            startLocation: { lat, lng }
          },
          this.validateInput
        );
      })
      .catch(error => console.error('Error', error));
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, this.validateInput);
  };

  validateInput = () => {
    const { startLocation, endLocation } = this.state;
    if (
      startLocation.lat
      && startLocation.lng
      && endLocation.lat
      && endLocation.lng
    ) {
      this.getUberEstimate();
    }
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    delet(DELETE_TICKET_API_ROUTE + this.props.ticketDetails.tid);
    this.props.push(HOME_PAGE_ROUTE);
  };

  handleCardNumber = (e) => {
    const number = e.target.value;
    this.setState(prevState => ({
      creditCard: {
        ...prevState.creditCard,
        number
      }
    }));
  };

  handleCardExpiry = (e) => {
    const expiry = e.target.value;
    this.setState(prevState => ({
      creditCard: {
        ...prevState.creditCard,
        expiry
      }
    }));
  };

  handleCardCvc = (e) => {
    const cvc = e.target.value;
    this.setState(prevState => ({
      creditCard: {
        ...prevState.creditCard,
        cvc
      }
    }));
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
    const ticket_price = parseFloat(this.props.ticketDetails.ticket_price);
    const fee = (Math.round(ticket_price * 0.05 * 100) / 100).toFixed(2);
    const {
      address, creditCard, method, upsCost, uberCost
    } = this.state;
    const shippingCost = method === 'ups' ? upsCost : uberCost;
    const totalCost = ticket_price + parseFloat(fee) + shippingCost;
    return (
      <Container>
        <Row>
          <Col md={9}>
            <Form>
              <h4 className="mb-3">Billing address</h4>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="password">Last Name</Label>
                    <Input type="password" name="password" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="1234 Main St"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input type="text" name="city" />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input type="text" name="state" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input type="number" name="zip" />
                  </FormGroup>
                </Col>
              </Row>
              <hr className="mb-4" />
              <h4 className="mb-3">Shipping Method</h4>
              <Row form>
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        checked={method === 'ups'}
                        onClick={e => this.setState({ method: 'ups' })}
                        name="ups"
                      />
                      UPS
                      <span className="text-muted">
                        (3-5 businessdays) - ${upsCost}
                      </span>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        checked={method === 'uber'}
                        disabled={uberCost === null}
                        onClick={e => this.setState({ method: 'uber' })}
                        name="uber"
                      />
                      Expeditated Shipping
                      <span className="text-muted">
                        (Same-day Uber) - ${uberCost}
                      </span>
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Row>
              <Row>
                <Col md={6}>
                  <h4 className="mb-3">Shipping Address</h4>
                  <LocationSearchInput
                    address={address}
                    handleLocationChange={this.handleLocationChange}
                    handleLocationSelect={this.handleLocationSelect}
                  />
                </Col>
              </Row>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment Method</h4>
              <CreditCardInput
                cardNumberInputProps={{
                  value: creditCard.number,
                  onChange: this.handleCardNumber
                }}
                cardExpiryInputProps={{
                  value: creditCard.expiry,
                  onChange: this.handleCardExpiry
                }}
                cardCVCInputProps={{
                  value: creditCard.cvc,
                  onChange: this.handleCardCvc
                }}
                fieldClassName="credit-card-input__field "
                inputClassName="credit-card-input__input"
              />
            </Form>
          </Col>
          <Col md={3}>
            <h4 className="mb-3">Your Event</h4>
            <ListGroup>
              <ListGroupItem>
                <span>Event Subtotal</span>
                <span className="float-right">${ticket_price}</span>
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
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
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
