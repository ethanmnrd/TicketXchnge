// @flow

import React, { Component } from 'react';
import {
  Button,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import EventBrowser from '../containers/EventBrowser';
import { CREATE_EVENT_PAGE } from '../../util/routes';

export default class SellPage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h4 style={{ textAlign: 'center' }} className="display-4">
              What are you selling?
            </h4>
            <InputGroup style={{ marginTop: '30px' }}>
              <Input placeholder="What events are happening..." />
              <InputGroupAddon addonType="append">
                <Button>Go</Button>
              </InputGroupAddon>
            </InputGroup>
            {/* <EventBrowser /> */}
            <p
              style={{ textAlign: 'center', marginTop: '30px' }}
              className="lead"
            >
              Didn't find what you are looking for?
              <Link to={CREATE_EVENT_PAGE}> Create an Event.</Link>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
