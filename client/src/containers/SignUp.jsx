// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
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
import { setJWT } from '../actions/index';
import { HOME_PAGE_ROUTE, USERS_API_ROUTE } from '../../util/routes';

class SignUp extends Component<Props, State> {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    emailValid: true,
    firstNameValid: true,
    lastNameValid: true,
    passwordValid: true,
    confirmation: ''
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    if (this.validateInput()) {
      const {
        firstName, lastName, email, password
      } = this.state;
      post(USERS_API_ROUTE, {
        f_name: firstName,
        l_name: lastName,
        email,
        user_name: email,
        password
      })
        .then((res) => {
          this.props.setJWT(res.data.token);
          this.props.push(HOME_PAGE_ROUTE);
          this.setState({ confirmation: 'SUCCESS' });
        })
        .catch((err) => {
          this.setState({ confirmation: `ERROR: ${err}` });
        });
    }
  };

  validateInput = () => {
    const {
      email, password, firstName, lastName
    } = this.state;
    // @TODO: Add handling for already used email
    const emailValid = email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    ) === null
      ? false
      : true;
    const passwordValid = password.length >= 8;
    const firstNameValid = firstName.length > 0;
    const lastNameValid = lastName.length > 0;
    this.setState({
      emailValid,
      passwordValid,
      firstNameValid,
      lastNameValid
    });
    return emailValid && passwordValid && firstNameValid && lastNameValid;
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
          Something went wrong with account creation: {confirmation}
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
                  invalid={!this.state.firstNameValid}
                />
                <FormFeedback>Name cannot be empty!</FormFeedback>
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
                  invalid={!this.state.lastNameValid}
                />
                <FormFeedback>Name cannot be empty!</FormFeedback>
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
          <Link to={HOME_PAGE_ROUTE}>
            <Button onClick={this.handleSubmitForm} color="primary">
              Create Account
            </Button>
          </Link>
          {this.renderAlert()}
        </Form>
      </Container>
    );
  }
}

export default connect(
  null,
  { setJWT, push }
)(SignUp);
