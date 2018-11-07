// @flow

import React, { Component } from 'react';
import { post } from 'axios';
import {
  Alert,
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
import { USERS_API_ROUTE } from '../../util/routes';

export default class SignUp extends Component<Props, State> {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    formValid: false,
    emailValid: true,
    passwordValid: true,
    confirmation: ''
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
    const passwordValid = password.length >= 8;
    const formValid = emailValid && passwordValid;
    this.setState({ emailValid, passwordValid, formValid });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    const {
      firstName, lastName, email, password
    } = this.state;
    post(USERS_API_ROUTE, {
      firstName,
      lastName,
      email,
      user_name: email,
      password
    })
      .then((res) => {
        console.dir(res);
        this.setState({ confirmation: 'SUCCESS' });
      })
      .catch((err) => {
        console.dir(err);
        this.setState({ confirmation: `ERROR: ${err}` });
      });
  };

  renderAlert = () => {
    const { confirmation } = this.state;
    if (confirmation === 'SUCCESS') {
      return (
        <Alert color="success" style={{ marginTop: '20px' }}>
          Account creation successful!
        </Alert>
      );
    }
    if (confirmation.includes('ERROR')) {
      return (
        <Alert color="danger" style={{ marginTop: '20px' }}>
          Something went wrong with account creation:
          {' '}
          {confirmation}
        </Alert>
      );
    }
    return null;
  };

  render() {
    return (
      <Container className="align-middle" style={this.props.style}>
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
                <FormText>Please use at least 8 characters</FormText>
              </FormGroup>
            </Col>
          </Row>
          <Button
            disabled={!this.state.formValid}
            onClick={this.handleSubmitForm}
            color="primary"
          >
            Create Account
          </Button>
          {this.renderAlert()}
        </Form>
      </Container>
    );
  }
}
