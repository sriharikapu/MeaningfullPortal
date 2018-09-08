import React, { Component, Fragment } from "react";
import { get } from "dot-prop";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";

import ChargeModal from "./charge";

import {
  Button,
  ButtonGroup,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";

import {
  Section,
  StickyPeriodHeader,
  LatePaymentLine,
  PaymentLine
} from "../../components/Styled/index";
const months = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March"
];
const payments = [
  {
      address: "Rachel Finger",
      id: 1,
      max: 3.15
  },
  {
      address: "Max Dinker",
      id: 2,
      max: 0.5
  }
];

class Payee extends Component {

    state = {	
	chargeModalOpen: false
    };

    toggleCharge = () => {
	this.setState(state => ({
	    ...state,
	    chargeModalOpen: !state.chargeModalOpen
	}));
    };
    
    constructor(props, context) {
      super();
      this.contracts = context.drizzle.contracts;
  }

  charge(index, amount) {
      console.log(index, amount);
      const charge = this.getData('Ledger', 'charge', index, amount);
      console.log(charge);
  }

    getData = (contract, method, index, amount) => {
	console.log(this.contracts[contract]);
	let value = get(
	    this.props.contracts[contract][method][
		this.contracts[contract].methods[method].cacheCall(index, amount)
	  ],
	  "value"
      );
      return value;
  };
    
  render() {
      return (	  
	      <div>
		  <Section>
		      <h1 className="display-3">Welcome Payee!</h1>
		      <Container>
			  <Row>
			      <Col md="6">
				  <Card body inverse color="info">
				      <CardTitle>Allowances</CardTitle>
				      <CardText>Total Of: 500 ETH.</CardText>
				      <Button>Button</Button>
				  </Card>
			      </Col>
			      <Col md="6">
				  <Card body inverse color="danger">
				      <CardTitle>Debt to me</CardTitle>
				      <CardText>Total Of: 2.15 ETH.</CardText>
				      <Button>Button</Button>
				  </Card>
			      </Col>
			  </Row>
		      </Container>
		  </Section>
		  <Container>
		      <StickyPeriodHeader>Late Payments</StickyPeriodHeader>
		      <LatePaymentLine>
			  <div>
			      <h4 className="text-danger">Moshik Kaki</h4>
			      <div className="text-muted">Over 3 weeks</div>
			  </div>
			  <h4 className="text-danger">15ETH</h4>
			  <div>
			      <ButtonGroup>
				  <Button color="primary">Charge</Button>
				  <Button color="secondary">Transfer</Button>
				  <Button color="warning">Auction</Button>
			      </ButtonGroup>
			  </div>
		      </LatePaymentLine>
		      {months.map(month => (
			  <Fragment key={month}>
			      <StickyPeriodHeader>{month}</StickyPeriodHeader>
			      {payments.map(({ address, max, id }) => (
				  <PaymentLine key={address}>
				      <div>
					  <h4>{address}</h4>
					  <div className="text-muted">
					      Max. {max}
					      ETH
					  </div>
				      </div>
				      <div>
					  <Button
					      color="primary"
					      onClick={(e) => {
						      this.state.currentIndex = id;
						      this.toggleCharge();
					      }}>Charge
					  </Button>
				      </div>
				  </PaymentLine>
			      ))}
			  </Fragment>
		      ))}
		  </Container>
		  <ChargeModal
		      toggle={this.toggleCharge}
		      index={this.state.currentIndex}
		      open={this.state.chargeModalOpen}
		  />
	      </div>
      );
  }
}


Payee.contextTypes = {
    drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts }) => {
    return {
	contracts
    };
};

export default drizzleConnect(Payee, mapStateToProps);
