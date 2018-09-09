import React, { Component } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

export default class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(state => ({ ...state, isOpen: !state.isOpen }));
  };

  render() {
    return (
      <Navbar color="secondary" light expand="md">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt={"Pully"} />
          Pully
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/payee" className="nav-link">
                Get paid
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/payer" className="nav-link">
                Issue allowances
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
