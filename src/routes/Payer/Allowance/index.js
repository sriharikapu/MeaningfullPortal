import React, { Component } from "react";
import { Link } from 'react-router-dom'

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    ListGroup,
    ListGroupItem
} from "reactstrap";


export default class AllowanceForm extends Component {
    render() {
        return (
	    <div>		
		Allowance  Form
		<Button	children='Back'>
		    <Link to={`/payer`}>{"Back"}</Link>
		</Button>
		
		<InputGroup>
		    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
		    <Input placeholder="username" />
		</InputGroup>
		<br />
		<InputGroup>
		    <InputGroupAddon addonType="prepend">
			<InputGroupText>
			    <Input addon type="checkbox" aria-label="Checkbox for following text input" />
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
