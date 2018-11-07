// @flow

import React, { Component } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { get } from 'axios';
import {
  Button,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from 'reactstrap';
import { TICKETS_API_ROUTE } from '../../util/routes';

export default class TicketBrowser extends Component<Props, State> {
  state = {
    query: '',
    tickets: []
  };

  renderTable = () => {
    const { tickets } = this.state;
    return (
      <AutoSizer>
        {({ width }) => (
          <Table
            gridClassName="Table"
            headerHeight={50}
            headerClassName=""
            height={300}
            noRowsRenderer={() => <div className="noRows">No Results</div>}
            rowCount={tickets.length}
            rowGetter={({ index }) => tickets[index]}
            rowHeight={50}
            rowClassName={this.getRowClassName}
            width={width}
          >
            <Column
              width={100}
              label="Price"
              dataKey="ticket_price"
              className="column"
            />
            <Column
              width={200}
              label="Event"
              dataKey="ticket_event"
              className="column"
            />
          </Table>
        )}
      </AutoSizer>
    );
  };

  getRowClassName = ({ index }) => {
    if (index < 0) {
      return 'headerRow';
    }
    return index % 2 === 0 ? 'evenRow' : 'oddRow';
  };

  componentDidMount = () => {
    get(TICKETS_API_ROUTE)
      .then(res => this.setState({ tickets: res.data }))
      .catch((err) => {
        console.dir(err);
      });
  };

  render() {
    const { query } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <InputGroup>
              <Input
                values={query}
                placeholder="What events are happening..."
              />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <Row style={{ marginTop: '35px' }}>
          <Col sm={{ size: 8, offset: 2 }}>{this.renderTable()}</Col>
        </Row>
      </Container>
    );
  }
}
