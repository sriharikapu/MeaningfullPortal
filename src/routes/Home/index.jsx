import React, { Component } from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";
import { get } from "dot-prop";
import { Button, Col, Container, Row } from "reactstrap";
import { utils } from "web3";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { Section } from "../../components/Styled";

class Home extends Component {
    state = {
	depositModalOpen: false,
	withdrawModalOpen: false
    };

    constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let different =
      JSON.stringify({ props: nextProps, state: nextState }) !==
      JSON.stringify({ props: this.props, state: this.state });
    if (different) {
      debugger;
    }
    return different;
  }

  getData = (contract, method, defaultValue, mapping = a => a) => {
    let value = get(
      this.props.contracts[contract][method][
        this.contracts[contract].methods[method].cacheCall()
      ],
      "value"
    );

    if (value === undefined) {
      return defaultValue;
    }

    return mapping(value);
  };

    toggleWithdraw = () => {
	this.setState(state => ({
	    ...state,
	    withdrawModalOpen: !state.withdrawModalOpen
	}));
    };

    toggleDeposit = () => {
    this.setState(state => ({
      ...state,
      depositModalOpen: !state.depositModalOpen
    }));
  };

  withdraw = () => {};

  render() {
    const balance = this.getData(
      "Ledger",
      "getDepositBalance",
      "Unknown",
      value => utils.fromWei(value)
    );
    return (
	<div>
            <Section>
		<h2>My Balance</h2>
		<Container>
		    <Row>
			<Col md="9" sm="6">
			    <h1 className="display-3">
				{balance}
				ETH
			    </h1>
			</Col>
			<Col md="3" sm="6">
			    <Button
				onClick={this.toggleDeposit}
				block
				size="lg"
				color="primary"
			    >
				Deposit
			    </Button>
			    <Button
				onClick={this.toggleWithdraw}
				block
				size="lg"
				color="secondary"
			    >
				Withdraw
			    </Button>
			</Col>
		    </Row>
		</Container>
            </Section>
            <DepositModal
	    toggle={this.toggleDeposit}
	    open={this.state.depositModalOpen}
            />
            <WithdrawModal
	    toggle={this.toggleWithdraw}
	    open={this.state.withdrawModalOpen}
            />
	</div>
    );
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts }) => {
  const { synced, ...ledger } = contracts.Ledger;
  return {
    contracts: { Ledger: ledger }
  };
};

export default drizzleConnect(Home, mapStateToProps);
