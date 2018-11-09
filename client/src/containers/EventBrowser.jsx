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
import { EVENTS_API_ROUTE } from '../../util/routes';

export default class EventBrowser extends Component<Props, State> {
  state = {
    query: '',
    events: []
  };

  renderTable = () => {
    const { events } = this.state;
    return (
      <AutoSizer>
        {({ width }) => (
          <Table
            gridClassName="Table"
            headerHeight={50}
            headerClassName=""
            height={300}
            noRowsRenderer={() => <div className="noRows">No Results</div>}
            rowCount={events.length}
            rowGetter={({ index }) => events[index]}
            rowHeight={50}
            rowClassName={this.getRowClassName}
            width={width}
          >
            <Column
              width={100}
              label="Event"
              dataKey="event_name"
              className="column"
            />
            <Column
              width={200}
              label="Venue"
              dataKey="event_venue"
              className="column"
            />
            <Column
              width={200}
              label="City"
              dataKey="event_city"
              className="column"
            />
            <Column
              width={200}
              label="Date"
              dataKey="event_date"
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
    get(EVENTS_API_ROUTE)
      .then(res => this.setState({ events: res.data }))
      .catch((err) => {
        console.dir(err);
      });
  };

  render() {
    const { query } = this.state;
    console.dir(this.state.events);
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
