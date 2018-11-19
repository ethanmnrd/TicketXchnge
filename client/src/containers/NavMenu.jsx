import React from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import { APP_NAME } from '../../util/config';
import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SELL_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE
} from '../../util/routes';
import { restoreJWT, deleteJWT } from '../actions/index';

class NavMenu extends React.Component {
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

  handleLogout = (e) => {
    this.props.restoreJWT();
  };

  componentDidMount = () => {
    console.log('In NavMenu componentDidMount()');
    this.props.restoreJWT();
  };

  renderProfileDropdown = () => (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Profile
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <Link exact tag={RRNavLink} to={PROFILE_PAGE_ROUTE}>
            Checkout Profile
          </Link>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  render() {
    const { isOpen } = this.state;
    const routes = this.props.jwt !== null
      ? [
        { name: 'Home', route: HOME_PAGE_ROUTE },
        { name: 'Sell Tickets', route: SELL_PAGE_ROUTE }
      ]
      : [
        { name: 'Home', route: HOME_PAGE_ROUTE },
        { name: 'Login', route: LOGIN_PAGE_ROUTE }
      ];

    return (
      <Navbar color="dark" dark expand style={{ marginBottom: '30px' }}>
        <NavbarToggler right="true" onClick={this.toggle} />
        <NavbarBrand tag={Link} to={HOME_PAGE_ROUTE}>
          {APP_NAME}
        </NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {routes.map(({ name, route }) => (
              <NavItem>
                <NavLink exact tag={RRNavLink} to={route}>
                  {name}
                </NavLink>
              </NavItem>
            ))}
            {this.props.jwt ? this.renderProfileDropdown() : null}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.jwt
});

export default connect(
  mapStateToProps,
  { restoreJWT, deleteJWT }
)(NavMenu);
