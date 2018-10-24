import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

// @ TODO: These CSS properties aren't given priority. Find out why

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div style={{ maxWidth: '200px' }}>
        <Nav vertical className="sideNav">
          <NavItem>
            <NavLink style={{ color: '#fff' }} href="#">
              Browse Tickets
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{ color: '#fff' }} href="#">
              Post a Ticket Listing
            </NavLink>
          </NavItem>
          <hr />
          <h5>Account</h5>
          <NavItem>
            <NavLink style={{ color: '#fff' }} href="#">
              Purchased Tickets
            </NavLink>
            <NavLink style={{ color: '#fff' }} href="#">
              Purchased Tickets
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
