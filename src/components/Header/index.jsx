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

export default class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(state => ({ ...state, isOpen: !state.isOpen }));
  };

  render() {
    return (
      <Navbar color="light" light expand="md">
        <Link to="/" className="navbar-brand">
          Direct Debit
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/payee" className="nav-link">
                Payee
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/payer" className="nav-link">
                Payer
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
