// @flow

import React from 'react';
import Helmet from 'react-helmet';
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from 'reactstrap';
// import SideMenu from '../containers/SideMenu';
import { APP_NAME } from '../../util/config';

const HomePage = () => (
  <div>
    <Helmet
      meta={[
        { name: 'description', content: 'At HomePage of Hello App' },
        { property: 'og:title', content: APP_NAME }
      ]}
    />
    {/* <SideMenu /> */}
    <Container fluid>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <InputGroup>
            <Input placeholder="What events are happening..." />
            <InputGroupAddon addonType="append">
              <Button>Go</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  </div>
);

export default HomePage;
