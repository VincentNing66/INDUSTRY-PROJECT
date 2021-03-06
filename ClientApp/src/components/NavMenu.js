import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { logout } from './js/Cookies.js';
import { loadavg } from 'os';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-lg navbar-dark bg-dark border-bottom box-shadow mb-3" bg="dark" variant="dark">
          <Container>
            <NavbarBrand tag={Link} to="/DashboardMain"><img src={require('./img/transparent.png')} /></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/ManageUserAccount">Manage User Account</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/DashboardMain">Dashboard</NavLink>
                </NavItem> 
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/EditUserAccount">Edit User Account</NavLink>
                </NavItem> 
                <NavItem>
                  <NavLink tag={Link} className="text-light" to="/Loginform" onClick={logout} > Log Out</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
