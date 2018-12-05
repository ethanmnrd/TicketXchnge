import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
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
  SELL_PAGE_ROUTE
  // PROFILE_PAGE_ROUTE
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
    this.props.deleteJWT();
    this.props.push(HOME_PAGE_ROUTE);
  };

  renderProfileDropdown = () => (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Profile
      </DropdownToggle>
      <DropdownMenu right>
        {/* <DropdownItem>
          <Link to={PROFILE_PAGE_ROUTE}>Checkout Profile</Link>
        </DropdownItem> */
        /* <DropdownItem divider /> */}
        <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  componentDidMount = () => {
    this.props.restoreJWT();
  };

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
              <NavItem key={route}>
                <NavLink
                  location={this.props.router.location}
                  exact
                  tag={RRNavLink}
                  to={route}
                >
                  {name}
                </NavLink>
              </NavItem>
            ))}
            {this.props.jwt !== null ? this.renderProfileDropdown() : null}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.jwt,
  router: state.router
});

export default withRouter(
  connect(
    mapStateToProps,
    { restoreJWT, deleteJWT, push }
  )(NavMenu)
);
