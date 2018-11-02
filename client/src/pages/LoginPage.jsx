// @flow

import React, { Component } from 'react';

export default class LoginPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="container align-middle" style={{ marginTop: '50px' }}>
        <h1 style={{ textAlign: 'center' }} className="display-1">
          TicketX
        </h1>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.value })}
            />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Remember Me</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
          >
            Sign In
          </button>
          <button
            className="btn btn-success"
            style={{ marginTop: '20px', marginLeft: '15px' }}
          >
            Create Account
          </button>
        </form>
      </div>
    );
  }
}
