// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { get } from 'axios';
import { debounce } from 'lodash';
import { format } from 'date-fns';
import {
  Container, Col, Input, InputGroup, Row
} from 'reactstrap';
import {
  TICKETS_API_ROUTE,
  CHECKOUT_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE
} from '../../util/routes';

class TicketBrowser extends Component<Props, State> {
  state = {
    hoveredRowIndex: null,
    query: '',
    tickets: [],
    noRowsMessage: ''
  };

  handleQueryInput = (e) => {
    const query = e.target.value;
    this.setState({ query });
    this.updateTable(query);
  };

  handleRowClick = ({ rowData }) => {
    if (this.props.jwt) {
      this.props.push(CHECKOUT_PAGE_ROUTE, { ticketDetails: rowData });
    } else {
      this.props.push(LOGIN_PAGE_ROUTE);
    }
  };

  updateTable = debounce((query) => {
    this.setState({ tickets: [], noRowsMessage: 'Loading...' });
    get(TICKETS_API_ROUTE, {
      params: {
        ticket_event: query
      }
    })
      .then((res) => {
        // console.dir(res);
        if (res.data.length > 0) {
          this.setState({ tickets: res.data });
        } else {
          this.setState({ noRowsMessage: 'No Events Found' });
        }
      })
      .catch((err) => {
        console.dir(err);
      });
  }, 500);

  getRowClassName = ({ index }) => {
    if (index < 0) {
      return 'headerRow';
    }
    if (index === this.state.hoveredRowIndex) {
      return 'hoveredRow';
    }
    return index % 2 === 0 ? 'evenRow' : 'oddRow';
  };

  getDate = ({ event_date, start_time }) => {
    const date = new Date(
      parseInt(event_date.substring(0, 4), 10),
      parseInt(event_date.substring(5, 7), 10) - 1,
      parseInt(event_date.substring(8, 10), 10),
      parseInt(start_time.substring(0, 2), 10),
      parseInt(start_time.substring(3, 5), 10)
    );
    return format(date, 'MMM Do, YYYY hh:mmA');
  };

  renderTable = () => {
    const { tickets, noRowsMessage } = this.state;
    return (
      <AutoSizer>
        {({ width }) => (
          <Table
            gridClassName="Table"
            headerHeight={50}
            headerClassName=""
            height={400}
            noRowsRenderer={() => <div className="noRows">{noRowsMessage}</div>}
            rowCount={tickets.length}
            rowGetter={({ index }) => tickets[index]}
            rowHeight={50}
            rowClassName={this.getRowClassName}
            onRowClick={this.handleRowClick}
            onRowMouseOver={({ index }) => this.setState({ hoveredRowIndex: index })
            }
            onRowMouseOut={() => this.setState({ hoveredRowIndex: null })}
            width={width}
          >
            <Column
              cellDataGetter={({ rowData }) => this.getDate(rowData)}
              width={200}
              label="Date"
              dataKey="ticket_event"
              className="column"
            />
            <Column
              width={400}
              label="Event"
              dataKey="ticket_event"
              className="column"
            />
            <Column
              width={120}
              label="City"
              dataKey="city"
              className="column"
            />
            <Column
              width={250}
              label="Venue"
              dataKey="venue"
              className="column"
            />
            <Column
              width={85}
              label="Quantity"
              dataKey="ticket_quantity"
              className="column"
            />
            <Column
              cellDataGetter={({ rowData }) => `$${rowData.ticket_price.toFixed(2)}`
              }
              width={80}
              label="Price"
              dataKey="ticket_price"
              className="column"
            />
          </Table>
        )}
      </AutoSizer>
    );
  };

  componentDidMount = () => {
    this.updateTable(this.state.query);
  };

  render() {
    const { query } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <InputGroup>
              <Input
                value={query}
                onChange={this.handleQueryInput}
                placeholder="What events are happening..."
              />
            </InputGroup>
          </Col>
        </Row>
        <Row style={{ marginTop: '40px' }}>
          <Col sm={{ size: 10, offset: 1 }}>{this.renderTable()}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.jwt
});

export default connect(
  mapStateToProps,
  { push }
)(TicketBrowser);
