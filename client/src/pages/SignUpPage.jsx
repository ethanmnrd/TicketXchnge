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
  Label,
  Row
} from 'reactstrap';

export default class SignUpPage extends Component<Props, State> {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    formValid: false,
    emailValid: true,
    passwordValid: true
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    // @TODO: Add handling for already used email
    const emailValid = email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    ) === null
      ? false
      : true;
    const passwordValid = password.length >= 6;
    const formValid = emailValid && passwordValid;
    this.setState({ emailValid, passwordValid, formValid });
  };

  render() {
    return (
      <Container className="align-middle">
        <Form style={{ marginTop: '20px' }}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  value={this.state.firstName}
                  onChange={this.handleUserInput}
                  placeholder="Enter First Name"
                  type="text"
                  name="firstName"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  value={this.state.lastName}
                  onChange={this.handleUserInput}
                  placeholder="Enter Last Name"
                  type="text"
                  name="lastName"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  placeholder="Enter Email"
                  type="text"
                  name="email"
                  invalid={!this.state.emailValid}
                />
                <FormFeedback>Please enter a valid email!</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  value={this.state.password}
                  onChange={this.handleUserInput}
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  invalid={!this.state.passwordValid}
                />
                <FormFeedback>Please check password requirements!</FormFeedback>
                <FormText>Please use at least 6 characters</FormText>
              </FormGroup>
            </Col>
          </Row>
          <Button disabled={!this.state.formValid} color="primary">
            Create Account
          </Button>
        </Form>
      </Container>
    );
  }
}
