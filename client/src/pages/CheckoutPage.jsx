import React from 'react';
import CreditCardInput from 'react-credit-card-input';
import {
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
// @ TODO: These CSS properties aren't given priority. Find out why

export default class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: {
        cvc: 131,
        expiry: '10/20',
        name: 'John Davis',
        number: '4465400307927329'
      }
    };
    this.handleCardNumber = this.handleCardNumber.bind(this);
  }

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

  render() {
    const { creditCard } = this.state;
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
>
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
                    />
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
                    <Input type="text" name="zip" />
                  </FormGroup>
                </Col>
              </Row>
              <hr className="mb-4" />
              <h4 className="mb-3">Shipping Method</h4>
              <Row form>
                <FormGroup tag="fieldset">
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="shipping" />
                      Standard Shipping
                      <span className="text-muted"> (2-5 days)</span>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="shipping" />
                      Expeditated Shipping
                      <span className="text-muted"> (Same-day Uber)</span>
                    </Label>
                  </FormGroup>
                </FormGroup>
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
                <span className="float-right">$40</span>
              </ListGroupItem>
              <ListGroupItem>
                <span>TicketX Fee (5%)</span>
                <span className="float-right">$2</span>
              </ListGroupItem>
              <ListGroupItem>
                <span>Shipping</span>
                <span className="float-right">$5</span>
              </ListGroupItem>
              <ListGroupItem color="success">
                <span>Total (USD)</span>
                <strong className="float-right">$47</strong>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
