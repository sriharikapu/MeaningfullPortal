import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

export default class EditBenefactorForm extends Component {
  constructor(props) {
    super();
    console.log(this.props.match.params.bid);
    this.state = { benefactorId: this.props.match.params.bid };
  }

  render() {
    return (
      <div>
        <Button children="Back">
          <Link to={`/payer`}>{"Back"}</Link>
        </Button>
        Edit Benefactor, ID: {this.state.benefactorId}
        <InputGroup>
          <InputGroupAddon addonType="prepend">@</InputGroupAddon>
          <Input placeholder="username" />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Input
                addon
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Check it out" />
        </InputGroup>
        <br />
        <InputGroup>
          <Input placeholder="username" />
          <InputGroupAddon addonType="append">@example.com</InputGroupAddon>
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>$</InputGroupText>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Dolla dolla billz yo!" />
          <InputGroupAddon addonType="append">
            <InputGroupText>$</InputGroupText>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input placeholder="Amount" type="number" step="1" />
          <InputGroupAddon addonType="append">.00</InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
