// @flow

import React, { Component } from 'react';
import {
  Button,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { get } from 'axios';
import { debounce } from 'lodash';
import SellTicket from '../containers/SellTicket';
import { CREATE_EVENT_PAGE, EVENTS_API_ROUTE } from '../../util/routes';

export default class SellPage extends Component<Props, State> {
  state = {
    query: '',
    events: [],
    selectedEvent: null,
    modalOpen: false,
    noRowsMessage: 'Loading...'
  };

  getRowClassName = ({ index }) => {
    if (index < 0) {
      return 'headerRow';
    }
    return index % 2 === 0 ? 'evenRow' : 'oddRow';
  };

  handleRowClick = ({ event, index, rowData }) => {
    event.preventDefault();
    this.setState({ modalOpen: true, selectedEvent: rowData });
  };

  handleQueryInput = (e) => {
    const query = e.target.value;
    this.setState({ query });
    this.updateTable(query);
  };

  updateTable = debounce((query) => {
    this.setState({ events: [], noRowsMessage: 'Loading...' });
    get(EVENTS_API_ROUTE, {
      params: {
        event_name: query
      }
    })
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ events: res.data });
        } else {
          this.setState({ noRowsMessage: 'No Events Found' });
        }
      })
      .catch((err) => {
        console.dir(err);
      });
  }, 500);

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({ modalOpen: !this.state.modalOpen, selectedEvent: null });
  };

  componentDidMount = () => {
    this.updateTable(this.state.query);
  };

  render() {
    const {
      events, noRowsMessage, query, selectedEvent
    } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h4 style={{ textAlign: 'center' }} className="display-4">
              What are you selling?
            </h4>
            <InputGroup>
              <Input
                value={query}
                onChange={this.handleQueryInput}
                placeholder="What events are happening..."
              />
              <InputGroupAddon addonType="append">
                <Button>Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col sm={{ size: 8, offset: 2 }} style={{ marginTop: '35px' }}>
            <AutoSizer>
              {({ width }) => (
                <Table
                  gridClassName="Table"
                  headerHeight={50}
                  headerClassName=""
                  height={400}
                  noRowsRenderer={() => (
                    <div className="noRows">{noRowsMessage}</div>
                  )}
                  onRowClick={this.handleRowClick}
                  rowCount={events.length}
                  rowGetter={({ index }) => events[index]}
                  rowHeight={50}
                  rowClassName={this.getRowClassName}
                  width={width}
                >
                  <Column
                    width={400}
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
                    width={150}
                    label="City"
                    dataKey="event_city"
                    className="column"
                  />
                  <Column
                    width={100}
                    label="Date"
                    dataKey="event_date"
                    className="column"
                  />
                </Table>
              )}
            </AutoSizer>
          </Col>
        </Row>
        <p style={{ textAlign: 'center', marginTop: '425px' }} className="lead">
          Didn't find what you are looking for?
          <Link to={CREATE_EVENT_PAGE}> Create an Event.</Link>
        </p>
        <Modal
          size="lg"
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal}>
            {this.state.selectedEvent
              ? `${selectedEvent.event_name} at ${
                selectedEvent.event_venue
              } on ${selectedEvent.event_date}`
              : null}
          </ModalHeader>
          <SellTicket eventDetails={selectedEvent} />
        </Modal>
      </Container>
    );
  }
}
